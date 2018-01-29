import { put, call } from 'redux-saga/effects';
import { fetchEvent, removeEvent, updateEvent } from '../api/events';
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

export function* removeEventSaga({ payload }) {
    try {
        const response = yield call(removeEvent, payload);
        yield [
            put({ type: types.REMOVE_EVENT_SUCCESS, payload }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.REMOVE_EVENT_FAILURE });
    }
}

export function* updateEventSaga({ payload }) {
    try {
        const response = yield call(updateEvent, payload);
        yield [
            put({ type: types.UPDATE_EVENT_SUCCESS, payload, events: response }),
        ]
    } catch (error) {
        const response = {
            metadata: {
                error
            }
        };
        yield put({ type: types.UPDATE_EVENT_FAILURE, events: response });
    }
}
