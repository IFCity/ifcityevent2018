import fetch from '../services/fetchAdapter';
import appSettings from '../constants/aplication';


export const fetchTagsLookup = () => {
    return fetch(`${appSettings.apiURL}/tagslookup`)
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