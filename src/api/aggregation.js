import {promises, prepareIdQuery} from './fbHelper';
import appSettings from '../constants/aplication';
import moment from 'moment';
import fetch from "../services/fetchAdapter";

const fmt = appSettings.formats.date.system;

const isNewEvent = (start, end) => {
    return ((moment(start).format(fmt) >= moment().format(fmt)) || (moment(end || start).format(fmt) >= moment().format(fmt)));
};

const params = {
    appId: appSettings.FBPageId
};

export const aggregateFB = (token) => {
    return  promises.init(params)
        .then(
            () => promises.runQuery(appSettings.queries.places, token, 'search'),
            error => { throw error; }
        )
        .then(
            response => {
                let promisesList = [];
                let placesList = [];
                _(response.data)
                    .map(item => {
                        promisesList.push(promises.runQuery(prepareIdQuery(item.id), token));
                        placesList.push(item);
                    })
                    .value();
                return Promise.all(promisesList)
                    .then(
                        response => {
                            let events = [];
                            _(response)
                                .forEach((resp, index) => {
                                    let items = _(_.get(resp[placesList[index].id], 'events.data', []))
                                        .filter(event => isNewEvent(event.start_time, event.end_time))
                                        .map(item => {
                                            item.author = {
                                                id: placesList[index].id,
                                                name: _.get(placesList[index], 'name'),
                                                link: _.get(placesList[index], 'link'),
                                                cover: _.get(placesList[index], 'cover')
                                            };
                                            return item;
                                        })
                                        .value();
                                    events = events.concat(items);
                                })
                                .value;
                            return events;
                        },
                        error => { throw error; }
                    )
                    .catch(error => {
                        return {
                            metadata: {
                                error: error
                            }
                        };
                    });
            },
            error => { throw error; }
        )
        .then(
            placeResponse => {
                return fetch(`${appSettings.apiURL}/pages`)
                    .then(response => {
                        return response.json();
                    })
                    .then(json => {
                        return {
                            pages: json,
                            places: placeResponse
                        };
                    })
                    .catch(ex => (
                        {
                            metadata: {
                                error: ex
                            }
                        }
                    ));
            },
            error => { throw error; }
        )
        .then(
            placeResponse => {
                let promisesList = [];
                let pagesList = [];
                _(placeResponse.pages)
                    .map(item => {
                        promisesList.push(promises.runQuery(prepareIdQuery(item.id), token));
                        pagesList.push(item);
                    })
                    .value();
                return Promise.all(promisesList)
                    .then(
                        response => {
                            let events = placeResponse.places;
                            _(response)
                                .forEach((resp, index) => {
                                    let items = _(_.get(resp[pagesList[index].id], 'events.data', []))
                                        .filter(event => isNewEvent(event.start_time, event.end_time))
                                        .map(item => {
                                            item.author = pagesList[index];
                                            return item;
                                        })
                                        .value();
                                    events = events.concat(items);
                                })
                                .value;
                            return events;
                        },
                        error => { throw error; }
                    )
                    .catch(error => {
                        return {
                            metadata: {
                                error: error
                            }
                        };
                    });
            },
            error => { throw error; }
        ).
        then(
            fbEvents => {
                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({show_invalid: true, show_hidden: true})
                };
                return fetch(`${appSettings.apiURL}/events/search`, config)
                    .then(response => {
                        return response.json();
                    })
                    .then(dbEvents => {
                        const events = _(fbEvents)
                            .filter(item => _(dbEvents).findIndex({id: item.id}) === -1)
                            .map(item => {
                                item.category = 'not_set';
                                item.source = 'facebook';
                                item.tags = '';
                                item.integrate = true;
                                return item;
                            })
                            .value();
                        return {
                            data: _.uniqBy(events, 'id')
                        }
                    })
                    .catch(ex => (
                        {
                            metadata: {
                                error: ex
                            }
                        }
                    ));
            },
            error => { throw error; }
        )
        .catch(error => {
            return {
                metadata: {
                    error: error
                }
            };
        });
};
