import fetch from '../services/fetchAdapter';
import apiSettings from '../constants/api';


export const fetchUsers = () => {
    return fetch(`${apiSettings.apiURL}/users`)
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
