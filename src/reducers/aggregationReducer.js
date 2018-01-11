import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.events, action) {
    switch (action.type) {
        case types.GET_AGGREGATION_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_AGGREGATION_SUCCESS:
            return mapMetadataSuccess(state, action, 'aggregation');
        case types.GET_AGGREGATION_FAILURE:
            return mapMetadataFailure(state, action, 'aggregation');
        default:
            return state;
    }
}