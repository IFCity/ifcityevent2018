import * as types from '../constants/actionTypes';

export const getEventsAction = (payload) => ({
    type: types.GET_EVENTS_REQUEST,
    payload
});
