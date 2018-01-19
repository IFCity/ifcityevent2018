import fetch from '../services/fetchAdapter';
import appSettings from '../constants/aplication';


export const fetchCategories = () => {
    return fetch(`${appSettings.apiURL}/categories`)
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
