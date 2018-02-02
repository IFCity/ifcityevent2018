import moment from 'moment';

import fetch from '../services/fetchAdapter';
import appSettings from '../constants/aplication';
import { updateEvent } from './events';


const transformEvent = ({event,categories}) => {
    const catObj = _(categories).mapKeys('id').value();
    let result = {
        syncId: event._id,
        title: event.name,
        hidden: event.hidden,
        type: parseInt(catObj[event.category].ifc_type),
        price: null,
        
    };
    //ticketLink
    if (event.ticketUrl) {
        result.ticketLink = event.ticketUrl;
    }
    //place
    if (event.place) {
        let place = event.place.name ? event.place.name : '';
        if (place) {
            if (event.place.location && event.place.location.street) {
                place = `${place} (${event.place.location.street})`
            }
        } else {
            if (event.place.location && event.place.location.street) {
                place = event.place.location.street;
            }
        }
        result.place = place;
    }
    //price
    if (event.price) {
        let price = '';
        if (event.price.text) {
            price = event.price.text;
        } else if (event.price.from && event.price.to) {
            price = `${event.price.from} - ${event.price.to} грн`;
        } else if (event.price.from) {
            if (event.price.from === '0') {
                price = 'Безкоштовно';
            } else {
                price = `${event.price.from} грн`;
            }
        } else if (event.price.to) {
            price = `до ${event.price.from} грн`;
        }
        result.price = price;
    }
    //endDate
    if (event.end_time) {
        result.endDate = {
            '__type': 'Date',
            'iso': moment(event.end_time).format('YYYY-MM-DDTHH:mm:00.000[Z]')
        };
    }
    //phone
    if (event.phone) {
        result.phone = event.phone;
    }
    //startDate
    if (event.start_time) {
        result.startDate = {
            '__type': 'Date',
            'iso': moment(event.start_time).format('YYYY-MM-DDTHH:mm:00.000[Z]')
        };
    }
    //weeklyRecurrence
    if (event.weeklyRecurrence) {
        result.weeklyRecurrence = event.weeklyRecurrence;
    }
    //imageLink
    if (event.cover && event.cover.source) {
        result.imageLink = event.cover.source;
    }
    //description
    if (event.description) {
        result.description = event.description;
    }
    return result;
};

export const addSync = ({event, categories, auth}) => {
    const config = {
        method: 'POST',
        headers: {
            'X-Parse-Application-Id': appSettings.parse.appId,
            'X-Parse-REST-API-Key': appSettings.parse.apiKey,
            'X-Parse-Revocable-Session': appSettings.parse.session,
            'X-Parse-Session-Token': auth.sessionToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformEvent({event, categories}))
    };
    return fetch(`${appSettings.parse.url}/classes/Event`, config)
};

export const updateSync = ({event, categories, auth}) => {
    const config = {
        method: 'PUT',
        headers: {
            'X-Parse-Application-Id': appSettings.parse.appId,
            'X-Parse-REST-API-Key': appSettings.parse.apiKey,
            'X-Parse-Revocable-Session': appSettings.parse.session,
            'X-Parse-Session-Token': auth.sessionToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformEvent({event, categories}))
    };
    return fetch(`${appSettings.parse.url}/classes/Event/${event.syncId}`, config)
};

export const syncEvent = ({event, categories}) => {
    const config = {
        method: 'POST',
        headers: {
            'X-Parse-Application-Id': appSettings.parse.appId,
            'X-Parse-REST-API-Key': appSettings.parse.apiKey,
            'X-Parse-Revocable-Session': appSettings.parse.session
        }
    };
    return fetch(`${appSettings.parse.url}/login?username=${appSettings.parse.userName}&password=${appSettings.parse.password}`, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return {...json};
        })
        .then(auth => {
            return event.syncId ? updateSync({event, categories, auth}) : addSync({event, categories, auth});
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            event.syncId =  event.syncId || json.objectId;
            event.isSync = true;
            return updateEvent(event);
        })
        .catch(ex => (
            {
                metadata: {
                    error: ex
                }
            }
        ));
};