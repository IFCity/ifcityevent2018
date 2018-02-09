import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.authors, action) {
    switch (action.type) {
        case types.GET_AUTHORS_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_AUTHORS_SUCCESS:
            return mapMetadataSuccess(state, action, 'authors');
        case types.GET_AUTHORS_FAILURE:
            return mapMetadataFailure(state, action, 'authors');
        default:
            return state;
    }
}
