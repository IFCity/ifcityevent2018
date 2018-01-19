import fetch from '../services/fetchAdapter';
import appSettings from '../constants/aplication';


export const fetchPages = () => {
    return fetch(`${appSettings.apiURL}/pages`)
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