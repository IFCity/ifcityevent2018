import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.event, action) {
    switch (action.type) {

        case types.GET_EVENT_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_EVENT_SUCCESS:
            return mapMetadataSuccess(state, action, 'event');
        case types.GET_EVENT_FAILURE:
            return mapMetadataFailure(state, action, 'event');

        case types.INCVIEW_EVENT_REQUEST:
            return mapMetadataRequest(state);
        case types.INCVIEW_EVENT_SUCCESS:
            return mapMetadataSuccess(state, action, 'event');
        case types.INCVIEW_EVENT_FAILURE:
            return mapMetadataFailure(state, action, 'event');

        default:
            return state;
    }
}
