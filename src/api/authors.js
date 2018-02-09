import fetch from '../services/fetchAdapter';
import appSettings from '../constants/aplication';


export const fetchAuthors = () => {
    return fetch(`${appSettings.apiURL}/authors`)
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