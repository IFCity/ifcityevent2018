import fb from 'facebook-login-promises';
import appSettings from '../constants/aplication';

const params = {
    appId: appSettings.FBPageId
};

export const checkLoginStatus = (_callback) => {
    const callback = response => {
        console.log(response);
        if ((!response.loading) && (response.status === 'connected')) {
            _callback({
                loading: response.loading,
                status: response.status,
                user: {
                    id: response.data.id,
                    name: response.data.first_name
                }
            });
        } else {
            _callback({
                loading: response.loading,
                status: response.status,
                user: {
                    id: null,
                    name: ''
                }
            });
        }
    };

    fb.callback.checkStatus(params, response => {
        console.log(response);
        callback(response)
    });
};