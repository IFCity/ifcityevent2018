import { takeLatest, cancel, take, put, takeEvery } from 'redux-saga/effects';
import { searchMediaSaga, getImageDetails } from './mediaSagas';
import { getEventsSaga } from './eventsSaga';
import * as types from '../constants/actionTypes';


export function* watchSearchMedia() {
    yield takeLatest(types.SEARCH_MEDIA_REQUEST, searchMediaSaga);
}

export function* watchGetImageDetails() {
    yield takeLatest(types.GET_IMAGE_DETAILS_REQUEST, getImageDetails);
}

export function* watchGetEvents() {
    yield takeEvery(types.GET_EVENTS_REQUEST, getEventsSaga);
}
