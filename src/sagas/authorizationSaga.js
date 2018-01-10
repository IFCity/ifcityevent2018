import { put, call } from 'redux-saga/effects';
import { login, logout, checkStatus } from '../api/authorization';
import * as types from '../constants/actionTypes';


export function* loginSaga() {
    try {
        const response = yield call(login);
        yield [
            put({ type: types.LOGIN_SUCCESS, authorization: response }),
        ]
    } catch (error) {
        const response = {
            data: {},
            metadata: {
                error: error
            }
        };
        yield put({ type: types.LOGIN_FAILURE, authorization: response });
    }
}

export function* logoutSaga() {
    try {
        const response = yield call(logout);
        yield [
            put({ type: types.LOGOUT_SUCCESS, authorization: response }),
        ]
    } catch (error) {
        const response = {
            data: {},
            metadata: {
                error: error
            }
        };
        yield put({ type: types.LOGOUT_FAILURE, authorization: response });
    }
}

export function* checkStatusSaga() {
    try {
        const response = yield call(checkStatus);
        yield [
            put({ type: types.CHECK_STATUS_SUCCESS, authorization: response }),
        ]
    } catch (error) {
        const response = {
            data: {},
            metadata: {
                error: error
            }
        };
        yield put({ type: types.CHECK_STATUS_FAILURE, authorization: response });
    }
}
