import fetch from '../services/fetchAdapter';
import appSettings from '../constants/aplication';


export const fetchEvents = (payload) => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (payload) {
        config.body = {};
        if (payload.category) {
            config.body.categories = [payload.category];
        }
        if (payload.new) {
            config.body.new = true;
        }
        if (payload.invalid) {
            config.body.show_invalid = true;
        }
        if (payload.hidden) {
            config.body.show_hidden = true;
        }
        if (payload.all) {
            config.body.show_all = true;
        }
        config.body = JSON.stringify(config.body);
    }
    return fetch(`${appSettings.apiURL}/events/search`, config)
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

export const fetchEvent = (eventId) => {
    return fetch(`${appSettings.apiURL}/events/${eventId}`)
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

export const removeEvent = (eventId) => {
    let config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${appSettings.apiURL}/events/${eventId}`, config)
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
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let promises = [];
    let i, j, chunk = 10;
    for (i = 0, j = events.length; i < j; i += chunk) {
        promises.push(
            fetch(
                `${appSettings.apiURL}/events`,
                {...config, body: JSON.stringify(events.slice(i, i + chunk))}
            )
        );
    }
    return Promise.all(promises)
        .then(() => (
            {
                data: [],
                metadata: {
                    success: true
                }
            }
        ))
        .catch(ex => (
            {
                metadata: {
                    error: ex
                }
            }
        ));
};

export const updateEvent = (event) => {
    let config = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_.omit(event, ['_id']))
    };
    return fetch(`${appSettings.apiURL}/events/${event._id}`, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return {
                data: json,
                metadata: {
                    success: true
                }
            };
        })
        .catch(ex => (
            {
                metadata: {
                    error: ex
                }
            }
        ));
};

export const incViewCountEvent = (eventId) => {
    let config = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${appSettings.apiURL}/events/view/${eventId}`, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return {
                data: json,
                metadata: {
                    success: true
                }
            };
        })
        .catch(ex => (
            {
                metadata: {
                    error: ex
                }
            }
        ));
};

export const addEvent = (event) => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([event])
    };
    return fetch(`${appSettings.apiURL}/events/`, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return {
                data: json && json[0],
                metadata: {
                    success: true
                }
            };
        })
        .catch(ex => (
            {
                metadata: {
                    error: ex
                }
            }
        ));
};

export const fetchMostViewedEvents = (payload) => {
    return fetch(`${appSettings.apiURL}/events/mostviewed`)
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
