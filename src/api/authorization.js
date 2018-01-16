import fetch from '../services/fetchAdapter';
import apiSettings from '../constants/api';
import appSettings from '../constants/aplication';
import {promises} from './fbHelper';


const params = {
    appId: appSettings.FBPageId
};

const getLongLiveToken = authResponse => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shortLiveToken: authResponse.accessToken,
            userId: authResponse.userID
        })
    };
    return fetch(`${apiSettings.apiURL}/authorization/gettoken`, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return { authResponse: json };
        });
};

const updateUserName = user => {
    let config = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    return fetch(`${apiSettings.apiURL}/users/${user.id}`, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return { response: json };
        });
};

export const login = () => {
    let authData = {};
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
            response => getLongLiveToken(response.authResponse),
            error => { throw error; }
        )
        .then(
            response => {
                authData = response.authResponse;
                return promises.fetchUser();
            },
            error => { throw error; }
        )
        .then(
            response => {
                updateUserName(response);
                return {
                    data: {
                        userData: response,
                        authData
                    }
                }
            },
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
            () => ({
                data: {
                    userData: {},
                    authData: {}
                }
            }),
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
    let authData = {};
    return promises.init(params)
        .then(
            promises.checkLoginState,
            error => { throw error; }
        )
        .then(
            response => getLongLiveToken(response.authResponse),
            error => { throw error; }
        )
        .then(
            response => {
                authData = response.authResponse;
                return promises.fetchUser();
            },
            error => { throw error; }
        )
        .then(
            response => ({
                data: {
                    userData: response,
                    authData
                }
            }),
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