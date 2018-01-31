import { put, call } from 'redux-saga/effects';
import { fetchMostViewedEvents } from '../api/events';
import * as types from '../constants/actionTypes';


export function* getMostviewedSaga({ payload }) {
    try {
        const response = yield call(fetchMostViewedEvents, payload);
        yield [
            put({ type: types.GET_MOSTVIEWEDEVENTS_SUCCESS, mostviewed: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_MOSTVIEWEDEVENTS_FAILURE, mostviewed: response });
    }
}
