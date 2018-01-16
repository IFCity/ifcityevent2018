import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.users, action) {
    switch (action.type) {
        case types.GET_USERS_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_USERS_SUCCESS:
            return mapMetadataSuccess(state, action, 'users');
        case types.GET_USERS_FAILURE:
            return mapMetadataFailure(state, action, 'users');
        default:
            return state;
    }
}
