import { put, call } from 'redux-saga/effects';
import { fetchAuthors } from '../api/authors';
import * as types from '../constants/actionTypes';


export function* getAuthorsSaga() {
    try {
        const response = yield call(fetchAuthors);
        yield [
            put({ type: types.GET_AUTHORS_SUCCESS, authors: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_AUTHORS_FAILURE, authors: response });
    }
}
