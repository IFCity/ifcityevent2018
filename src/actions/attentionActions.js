import * as types from '../constants/actionTypes';

export const getAttentionAction = (payload) => ({
    type: types.GET_ATTENTION_REQUEST,
    payload
});