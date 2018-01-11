import { put, call } from 'redux-saga/effects';
import { aggregateFB } from '../api/aggregation';
import * as types from '../constants/actionTypes';


export function* aggregateFBSaga({ payload }) {
    try {
        const response = yield call(aggregateFB, payload);
        yield [
            put({ type: types.GET_AGGREGATION_SUCCESS, aggregation: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_AGGREGATION_FAILURE, aggregation: response });
    }
}
