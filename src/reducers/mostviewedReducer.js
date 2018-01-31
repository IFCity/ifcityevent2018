import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {
    mapMetadataRequest,
    mapMetadataSuccess,
    mapMetadataFailure
} from '../services/reduserHelper';


export default function (state = initialState.mostviewed, action) {
    switch (action.type) {

        case types.GET_MOSTVIEWEDEVENTS_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_MOSTVIEWEDEVENTS_SUCCESS:
            return mapMetadataSuccess(state, action, 'mostviewed');
        case types.GET_MOSTVIEWEDEVENTS_FAILURE:
            return mapMetadataFailure(state, action, 'mostviewed');

        default:
            return state;
    }
}
