import { put, call } from 'redux-saga/effects';
import { fetchUsers } from '../api/users';
import * as types from '../constants/actionTypes';


export function* getUsersSaga() {
    try {
        const response = yield call(fetchUsers);
        yield [
            put({ type: types.GET_USERS_SUCCESS, users: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_USERS_FAILURE, users: response });
    }
}
