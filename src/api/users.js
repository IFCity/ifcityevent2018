import fetch from '../services/fetchAdapter';
import appSettings from '../constants/aplication';


export const fetchUsers = () => {
    return fetch(`${appSettings.apiURL}/users`)
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
