import fetch from '../services/fetchAdapter';
import apiSettings from '../constants/api';


export const fetchCategories = () => {
    return fetch(`${apiSettings.apiURL}/categories`)
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
