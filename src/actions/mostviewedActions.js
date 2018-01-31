import * as types from '../constants/actionTypes';

export const getMostViewedAction = (payload) => ({
    type: types.GET_MOSTVIEWEDEVENTS_REQUEST,
    payload
});