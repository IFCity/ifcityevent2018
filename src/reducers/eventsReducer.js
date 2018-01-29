import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
    mapMetadataRequest,
    mapMetadataSuccess,
    mapMetadataFailure,
    mapMetadataSuccessRemove,
    mapMetadataSuccessUpdate
} from '../services/reduserHelper';


export default function (state = initialState.events, action) {
    switch (action.type) {

        case types.GET_EVENTS_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_EVENTS_SUCCESS:
            return mapMetadataSuccess(state, action, 'events');
        case types.GET_EVENTS_FAILURE:
            return mapMetadataFailure(state, action, 'events');

        case types.SAVE_EVENTS_REQUEST:
            return mapMetadataRequest(state);
        case types.SAVE_EVENTS_SUCCESS:
            return mapMetadataSuccess(state, action, 'events');
        case types.SAVE_EVENTS_FAILURE:
            return mapMetadataFailure(state, action, 'events');

        case types.REMOVE_EVENT_REQUEST:
            return mapMetadataRequest(state);
        case types.REMOVE_EVENT_SUCCESS:
            return mapMetadataSuccessRemove(state, action, 'events');
        case types.REMOVE_EVENT_FAILURE:
            return mapMetadataFailure(state, action, 'events');

        case types.UPDATE_EVENT_REQUEST:
            return mapMetadataRequest(state);
        case types.UPDATE_EVENT_SUCCESS:
            return mapMetadataSuccessUpdate(state, action, 'events');
        case types.UPDATE_EVENT_FAILURE:
            return mapMetadataFailure(state, action, 'events');

        default:
            return state;
    }
}
