import * as types from '../constants/actionTypes';

export const getEventsAction = (payload) => ({
    type: types.GET_EVENTS_REQUEST,
    payload
});

export const saveEventsAction = (payload) => ({
    type: types.SAVE_EVENTS_REQUEST,
    payload
});

export const getEventAction = (payload) => ({
    type: types.GET_EVENT_REQUEST,
    payload
});

export const removeEventAction = (payload) => ({
    type: types.REMOVE_EVENT_REQUEST,
    payload
});

export const updateEventAction = (payload) => ({
    type: types.UPDATE_EVENT_REQUEST,
    payload
});

export const addEventAction = (payload) => ({
    type: types.ADD_EVENT_REQUEST,
    payload
});

export const incViewEventAction = (payload) => ({
    type: types.INCVIEW_EVENT_REQUEST,
    payload
});

export const syncEventAction = (payload) => ({
    type: types.SYNC_EVENT_REQUEST,
    payload
});
