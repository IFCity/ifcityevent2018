import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.tagsLookup, action) {
    switch (action.type) {
        case types.GET_TAGS_LOOKUP_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_TAGS_LOOKUP_SUCCESS:
            return mapMetadataSuccess(state, action, 'tagsLookup');
        case types.GET_TAGS_LOOKUP_FAILURE:
            return mapMetadataFailure(state, action, 'tagsLookup');
        default:
            return state;
    }
}