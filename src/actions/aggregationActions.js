import * as types from '../constants/actionTypes';


export const aggregateFBAction = (payload) => ({
    type: types.GET_AGGREGATION_REQUEST,
    payload
});