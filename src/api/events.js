import fetch from '../services/fetchAdapter';
import apiSettings from '../constants/api';


export const fetchEvents = (category) => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (category) {
        config.body = JSON.stringify({categories: [category]});
    }
    return fetch(`${apiSettings.apiURL}/events/search`, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return { data: json };
        })
        .catch(ex => (
            {
                metadata: {
                    error: ex
                }
            }
        ));
};

export const saveEvents = ({token, events}) => {
    console.log(token);
    console.log(events);
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(events)
    };
    return fetch(`${apiSettings.apiURL}/events`, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return { data: json };
        })
        .catch(ex => (
            {
                metadata: {
                    error: ex
                }
            }
        ));
};
