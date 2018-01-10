import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.authorization, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return mapMetadataRequest(state);
        case types.LOGIN_SUCCESS:
            return mapMetadataSuccess(state, action, 'authorization');
        case types.LOGIN_FAILURE:
            return mapMetadataFailure(state, action, 'authorization');
        case types.LOGOUT_REQUEST:
            return mapMetadataRequest(state);
        case types.LOGOUT_SUCCESS:
            return mapMetadataSuccess(state, action, 'authorization');
        case types.LOGOUT_FAILURE:
            return mapMetadataFailure(state, action, 'authorization');
        case types.CHECK_STATUS_REQUEST:
            return mapMetadataRequest(state);
        case types.CHECK_STATUS_SUCCESS:
            return mapMetadataSuccess(state, action, 'authorization');
        case types.CHECK_STATUS_FAILURE:
            return mapMetadataFailure(state, action, 'authorization');
        default:
            return state;
    }
}