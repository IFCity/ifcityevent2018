import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.pages, action) {
    switch (action.type) {
        case types.GET_PAGES_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_PAGES_SUCCESS:
            return mapMetadataSuccess(state, action, 'pages');
        case types.GET_PAGES_FAILURE:
            return mapMetadataFailure(state, action, 'pages');
        default:
            return state;
    }
}
