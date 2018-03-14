import { put, call } from 'redux-saga/effects';
import { fetchFilmEvents } from '../api/events';
import * as types from '../constants/actionTypes';


export function* getFilmSaga({ payload }) {
    try {
        const response = yield call(fetchFilmEvents, payload);
        yield [
            put({ type: types.GET_FILM_SUCCESS, film: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_FILM_FAILURE, film: response });
    }
}
