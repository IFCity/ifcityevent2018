import fetch from '../services/fetchAdapter';
import apiSettings from '../constants/api';


export const fetchPages = () => {
    return fetch(`${apiSettings.apiURL}/pages`)
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