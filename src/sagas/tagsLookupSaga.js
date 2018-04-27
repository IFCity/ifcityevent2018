import { put, call } from 'redux-saga/effects';
import { fetchTagsLookup } from '../api/tagsLookup';
import * as types from '../constants/actionTypes';


export function* getTagsLookupSaga() {
    try {
        const response = yield call(fetchTagsLookup);
        yield [
            put({ type: types.GET_TAGS_LOOKUP_SUCCESS, tagsLookup: response }),
        ]
    } catch (error) {
        const response = {
            data: [],
            metadata: {
                error
            }
        };
        yield put({ type: types.GET_TAGS_LOOKUP_FAILURE, tagsLookup: response });
    }
}