import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
    mapMetadataRequest,
    mapMetadataSuccess,
    mapMetadataFailure
} from '../services/reduserHelper';


export default function (state = initialState.child, action) {
    switch (action.type) {

        case types.GET_PROMO_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_PROMO_SUCCESS:
            return mapMetadataSuccess(state, action, 'promo');
        case types.GET_PROMO_FAILURE:
            return mapMetadataFailure(state, action, 'promo');

        default:
            return state;
    }
}
