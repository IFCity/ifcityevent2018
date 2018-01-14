import * as types from '../constants/actionTypes';

export const getEventsAction = (payload) => ({
    type: types.GET_EVENTS_REQUEST,
    payload
});

export const saveEventsAction = (payload) => ({
    type: types.SAVE_EVENTS_REQUEST,
    payload
});
