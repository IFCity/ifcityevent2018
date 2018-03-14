import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
    mapMetadataRequest,
    mapMetadataSuccess,
    mapMetadataFailure
} from '../services/reduserHelper';


export default function (state = initialState.child, action) {
    switch (action.type) {

        case types.GET_CHILD_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_CHILD_SUCCESS:
            return mapMetadataSuccess(state, action, 'child');
        case types.GET_CHILD_FAILURE:
            return mapMetadataFailure(state, action, 'child');

        default:
            return state;
    }
}
