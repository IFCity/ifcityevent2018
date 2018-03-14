import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
    mapMetadataRequest,
    mapMetadataSuccess,
    mapMetadataFailure
} from '../services/reduserHelper';


export default function (state = initialState.film, action) {
    switch (action.type) {

        case types.GET_FILM_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_FILM_SUCCESS:
            return mapMetadataSuccess(state, action, 'film');
        case types.GET_FILM_FAILURE:
            return mapMetadataFailure(state, action, 'film');

        default:
            return state;
    }
}
