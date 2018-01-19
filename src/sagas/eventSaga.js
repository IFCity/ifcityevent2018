import { put, call } from 'redux-saga/effects';
import { fetchEvent } from '../api/events';
import * as types from '../constants/actionTypes';


export function* getEventSaga({ payload }) {
    try {
        const response = yield call(fetchEvent, payload);
        yield [
            put({ type: types.GET_EVENT_SUCCESS, event: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_EVENT_FAILURE, event: response });
    }
}
