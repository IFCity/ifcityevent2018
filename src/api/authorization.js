import fetch from '../services/fetchAdapter';
import apiSettings from '../constants/api';
import appSettings from '../constants/aplication';


const params = {
    appId: appSettings.FBPageId
};

const promises = {
    init: (params) => {
        return new Promise((resolve) => {
            if (typeof FB !== 'undefined') {
                resolve();
            } else {
                window.fbAsyncInit = () => {
                    FB.init({
                        appId      : params.appId,
                        cookie     : true,  // enable cookies to allow the server to access the session
                        xfbml      : true,  // parse social plugins on this page
                        version    : params.version || 'v2.5' // use version 2.5
                    });
                    resolve();
                };
                (function(d, s, id) {
                    const fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    const js = d.createElement(s); js.id = id;
                    js.src = '//connect.facebook.net/en_US/sdk.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        });
    },
    checkLoginState: () => {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus((response) => {
                response.status === 'connected' ? resolve(response) : reject(response);
            });
        });
    },
    login: () => {
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                response.status === 'connected' ? resolve(response) : reject(response);
            });
        });
    },
    logout: () => {
        return new Promise((resolve, reject) => {
            FB.logout((response) => {
                response.authResponse ? resolve(response) : reject(response);
            });
        });
    },
    fetchUser: () => {
        return new Promise((resolve, reject) => {
            FB.api(
                '/me',
                {fields: 'first_name, last_name, gender'},
                response => response.error ? reject(response) : resolve(response)
            );
        });
    }
};


export const login = () => {
    return promises.init(params)
        .then(
            promises.checkLoginState,
            error => { throw error; }
        )
        .then(
            () => ({}),
            promises.login
        )
        .then(
            () => ({}),
            error => { throw error; }
        )
        .then(
            promises.fetchUser,
            error => { throw error; }
        )
        .then(
            response => ({ data: response }),
            error => { throw error; }
        )
        .catch(ex => {
            return {
                metadata: {
                    error: ex
                }
            };
        });
};

export const logout = () => {
    return promises.init(params)
        .then(
            promises.checkLoginState,
            error => { throw error; }
        )
        .then(
            promises.logout,
            () => ({})
        )
        .then(
            () => ({ data: {} }),
            error => { throw error; }
        )
        .catch(ex => {
            return {
                metadata: {
                    error: ex
                }
            };
        });
};

export const checkStatus = () => {
    return promises.init(params)
        .then(
            promises.checkLoginState,
            error => { throw error; }
        )
        .then(
            promises.fetchUser,
            error => { throw error; }
        )
        .then(
            response => ({ data: response }),
            error => { throw error; }
        )
        .catch(ex => {
            return {
                metadata: {
                    error: ex
                }
            };
        });
};