import { takeLatest, takeEvery } from 'redux-saga/effects';
import { searchMediaSaga, getImageDetails } from './mediaSagas';
import { getEventsSaga, saveEventsSaga } from './eventsSaga';
import { getPagesSaga } from './pagesSaga';
import { loginSaga, logoutSaga, checkStatusSaga } from './authorizationSaga';
import { aggregateFBSaga } from './aggregationSaga';
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

export function* watchSaveEvents() {
    yield takeEvery(types.SAVE_EVENTS_REQUEST, saveEventsSaga);
}

export function* watchGetPages() {
    yield takeEvery(types.GET_PAGES_REQUEST, getPagesSaga);
}

export function* watchLogin() {
    yield takeEvery(types.LOGIN_REQUEST, loginSaga);
}

export function* watchLogout() {
    yield takeEvery(types.LOGOUT_REQUEST, logoutSaga);
}

export function* watchCheckStatus() {
    yield takeEvery(types.CHECK_STATUS_REQUEST, checkStatusSaga);
}

export function* watchAggregateFB() {
    yield takeEvery(types.GET_AGGREGATION_REQUEST, aggregateFBSaga);
}
