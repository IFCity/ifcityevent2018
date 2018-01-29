import * as types from '../constants/actionTypes';


export const aggregateFBAction = (payload) => ({
    type: types.GET_AGGREGATION_REQUEST,
    payload
});

export const toggleValidAction = (id) => ({
    type: types.TOGGLE_VALID,
    id
});

export const toggleHiddenAction = (id) => ({
    type: types.TOGGLE_HIDDEN,
    id
});

export const toggleIntegrateAction = (id) => ({
    type: types.TOGGLE_INTEGRATE,
    id
});

export const setMinPriceAction = payload => ({
    type: types.SET_MIN_PRICE,
    payload
});

export const setMaxPriceAction = payload => ({
    type: types.SET_MAX_PRICE,
    payload
});

export const setCategoryAction = payload => ({
    type: types.SET_CATEGORY,
    payload
});

export const setPhoneAction = payload => ({
    type: types.SET_PHONE,
    payload
});

export const setTicketUrlAction = payload => ({
    type: types.SET_TICKET_URL,
    payload
});
