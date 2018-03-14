import * as types from '../constants/actionTypes';

export const getChildAction = (payload) => ({
    type: types.GET_CHILD_REQUEST,
    payload
});