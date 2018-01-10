import * as types from '../constants/actionTypes';

export const loginAction = () => ({
    type: types.LOGIN_REQUEST
});

export const logoutAction = () => ({
    type: types.LOGOUT_REQUEST
});

export const checkStatusAction = () => ({
    type: types.CHECK_STATUS_REQUEST
});