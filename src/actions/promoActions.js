import * as types from '../constants/actionTypes';

export const getPromoAction = (payload) => ({
    type: types.GET_PROMO_REQUEST,
    payload
});