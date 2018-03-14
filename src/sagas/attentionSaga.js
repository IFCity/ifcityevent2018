import { put, call } from 'redux-saga/effects';
import { fetchAttentionEvents } from '../api/events';
import * as types from '../constants/actionTypes';


export function* getAttentionSaga({ payload }) {
    try {
        const response = yield call(fetchAttentionEvents, payload);
        yield [
            put({ type: types.GET_ATTENTION_SUCCESS, attention: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_ATTENTION_FAILURE, attention: response });
    }
}
