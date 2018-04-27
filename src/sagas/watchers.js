import { takeEvery } from 'redux-saga/effects';
import { getEventsSaga, saveEventsSaga } from './eventsSaga';
import {
    getEventSaga,
    removeEventSaga,
    updateEventSaga,
    addEventSaga,
    incViewEventSaga,
    syncEventSaga
} from './eventSaga';
import { getCategoriesSaga } from './categoriesSaga';
import { getPagesSaga } from './pagesSaga';
import { getUsersSaga } from './usersSaga';
import { loginSaga, logoutSaga, checkStatusSaga } from './authorizationSaga';
import { aggregateFBSaga } from './aggregationSaga';
import { getMostviewedSaga } from './mostviewedSaga';
import { getChildSaga } from './childSaga';
import { getPromoSaga } from './promoSaga';
import { getAttentionSaga } from './attentionSaga';
import { getAuthorsSaga } from './authorsSaga';
import * as types from '../constants/actionTypes';
import {getTagsLookupSaga} from './tagsLookupSaga';


export function* watchGetEvents() {
    yield takeEvery(types.GET_EVENTS_REQUEST, getEventsSaga);
}

export function* watchGetEvent() {
    yield takeEvery(types.GET_EVENT_REQUEST, getEventSaga);
}

export function* watchRemoveEvent() {
    yield takeEvery(types.REMOVE_EVENT_REQUEST, removeEventSaga);
}

export function* watchUpdateEvent() {
    yield takeEvery(types.UPDATE_EVENT_REQUEST, updateEventSaga);
}

export function* watchSyncEvent() {
    yield takeEvery(types.SYNC_EVENT_REQUEST, syncEventSaga);
}

export function* watchAddEvent() {
    yield takeEvery(types.ADD_EVENT_REQUEST, addEventSaga);
}

export function* watchIncViewEvent() {
    yield takeEvery(types.INCVIEW_EVENT_REQUEST, incViewEventSaga);
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

export function* watchMostviewed() {
    yield takeEvery(types.GET_MOSTVIEWEDEVENTS_REQUEST, getMostviewedSaga);
}

export function* watchChild() {
    yield takeEvery(types.GET_CHILD_REQUEST, getChildSaga);
}

export function* watchPromo() {
    yield takeEvery(types.GET_PROMO_REQUEST, getPromoSaga);
}

export function* watchAttention() {
    yield takeEvery(types.GET_ATTENTION_REQUEST, getAttentionSaga);
}

export function* watchGetAuthors() {
    yield takeEvery(types.GET_AUTHORS_REQUEST, getAuthorsSaga);
}

export function* watchTagsLookup() {
    yield takeEvery(types.GET_TAGS_LOOKUP_REQUEST, getTagsLookupSaga);
}
