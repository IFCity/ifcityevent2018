import { put, call } from 'redux-saga/effects';
import { fetchCategories } from '../api/categories';
import * as types from '../constants/actionTypes';


export function* getCategoriesSaga() {
    try {
        const response = yield call(fetchCategories);
        yield [
            put({ type: types.GET_CATEGORIES_SUCCESS, categories: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_CATEGORIES_FAILURE, categories: response });
    }
}
