import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.categories, action) {
    switch (action.type) {
        case types.GET_CATEGORIES_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_CATEGORIES_SUCCESS:
            return mapMetadataSuccess(state, action, 'categories');
        case types.GET_CATEGORIES_FAILURE:
            return mapMetadataFailure(state, action, 'categories');
        default:
            return state;
    }
}
