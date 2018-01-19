import { takeLatest, takeEvery } from 'redux-saga/effects';
import { getEventsSaga, saveEventsSaga } from './eventsSaga';
import { getEventSaga } from './eventSaga';
import { getCategoriesSaga } from './categoriesSaga';
import { getPagesSaga } from './pagesSaga';
import { getUsersSaga } from './usersSaga';
import { loginSaga, logoutSaga, checkStatusSaga } from './authorizationSaga';
import { aggregateFBSaga } from './aggregationSaga';
import * as types from '../constants/actionTypes';


export function* watchGetEvents() {
    yield takeEvery(types.GET_EVENTS_REQUEST, getEventsSaga);
}

export function* watchGetEvent() {
    yield takeEvery(types.GET_EVENT_REQUEST, getEventSaga);
}

export function* watchSaveEvents() {
    yield takeEvery(types.SAVE_EVENTS_REQUEST, saveEventsSaga);
}

export function* watchGetCategories() {
    yield takeEvery(types.GET_CATEGORIES_REQUEST, getCategoriesSaga);
}

export function* watchGetPages() {
    yield takeEvery(types.GET_PAGES_REQUEST, getPagesSaga);
}

export function* watchGetUsers() {
    yield takeEvery(types.GET_USERS_REQUEST, getUsersSaga);
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
