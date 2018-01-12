import { put, call } from 'redux-saga/effects';
import { fetchPages } from '../api/pages';
import * as types from '../constants/actionTypes';


export function* getPagesSaga() {
    try {
        const response = yield call(fetchPages);
        yield [
            put({ type: types.GET_PAGES_SUCCESS, pages: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_PAGES_FAILURE, pages: response });
    }
}
