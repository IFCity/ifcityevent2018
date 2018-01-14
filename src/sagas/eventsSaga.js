import { put, call } from 'redux-saga/effects';
import { fetchEvents, saveEvents } from '../api/events';
import * as types from '../constants/actionTypes';


export function* getEventsSaga({ payload }) {
    try {
        const response = yield call(fetchEvents, payload);
        yield [
            put({ type: types.GET_EVENTS_SUCCESS, events: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_EVENTS_FAILURE, events: response });
    }
}

export function* saveEventsSaga({ payload }) {
    try {
        const response = yield call(saveEvents, payload);
        yield [
            put({ type: types.SAVE_EVENTS_SUCCESS, events: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.SAVE_EVENTS_FAILURE, events: response });
    }
}
