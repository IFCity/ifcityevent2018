import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
    mapMetadataRequest,
    mapMetadataSuccess,
    mapMetadataFailure
} from '../services/reduserHelper';


export default function (state = initialState.attention, action) {
    switch (action.type) {

        case types.GET_ATTENTION_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_ATTENTION_SUCCESS:
            return mapMetadataSuccess(state, action, 'attention');
        case types.GET_ATTENTION_FAILURE:
            return mapMetadataFailure(state, action, 'attention');

        default:
            return state;
    }
}
