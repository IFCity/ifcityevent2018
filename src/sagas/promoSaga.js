import { put, call } from 'redux-saga/effects';
import { fetchPromoEvents } from '../api/events';
import * as types from '../constants/actionTypes';


export function* getPromoSaga({ payload }) {
    try {
        const response = yield call(fetchPromoEvents, payload);
        yield [
            put({ type: types.GET_PROMO_SUCCESS, promo: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_PROMO_FAILURE, promo: response });
    }
}
