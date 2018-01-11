import {promises, prepareIdQuery} from './fbHelper';
import appSettings from '../constants/aplication';
import moment from 'moment';

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
                        placesList.push(item.id);
                    })
                    .value();
                return Promise.all(promisesList)
                    .then(
                        response => {
                            let events = [];
                            _(response)
                                .forEach((resp, index) => {
                                    let items = _(_.get(resp, `${placesList[index]}.events.data`, []))
                                        .filter(event => isNewEvent(event.start_time, event.end_time))
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
            (placeResponse) => {
                let promisesList = [];
                let pagesList = [];
                _(appSettings.pages)
                    .map(item => {
                        promisesList.push(promises.runQuery(prepareIdQuery(item.id), token));
                        pagesList.push(item.id);
                    })
                    .value();
                return Promise.all(promisesList)
                    .then(
                        response => {
                            let events = placeResponse;
                            _(response)
                                .forEach((resp, index) => {
                                    let items = _(_.get(resp, `${pagesList[index]}.events.data`, []))
                                        .filter(event => isNewEvent(event.start_time, event.end_time))
                                        .value();
                                    events = events.concat(items);
                                })
                                .value;
                            return { data: events };
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
        .catch(error => {
            return {
                metadata: {
                    error: error
                }
            };
        });
};
