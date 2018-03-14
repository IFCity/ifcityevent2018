import { put, call } from 'redux-saga/effects';
import { fetchChildEvents } from '../api/events';
import * as types from '../constants/actionTypes';


export function* getChildSaga({ payload }) {
    try {
        const response = yield call(fetchChildEvents, payload);
        yield [
            put({ type: types.GET_CHILD_SUCCESS, child: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_CHILD_FAILURE, child: response });
    }
}
