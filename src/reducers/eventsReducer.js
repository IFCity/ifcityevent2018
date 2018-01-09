import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.events, action) {
    switch (action.type) {
        case types.GET_EVENTS_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_EVENTS_SUCCESS:
            return mapMetadataSuccess(state, action, 'events');
        case types.GET_EVENTS_FAILURE:
            return mapMetadataFailure(state, action, 'events');
        default:
            return state;
    }
}
