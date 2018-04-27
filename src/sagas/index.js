import { fork, all } from 'redux-saga/effects';
import {
    watchGetEvents,
    watchGetEvent,
    watchRemoveEvent,
    watchUpdateEvent,
    watchSyncEvent,
    watchAddEvent,
    watchIncViewEvent,
    watchSaveEvents,
    watchGetCategories,
    watchGetPages,
    watchGetUsers,
    watchLogin,
    watchLogout,
    watchCheckStatus,
    watchAggregateFB,
    watchChild,
    watchPromo,
    watchAttention,
    watchGetAuthors,
    watchTagsLookup
} from './watchers';


export default function* root() {
    yield all([
        fork(watchGetEvents),
        fork(watchGetEvent),
        fork(watchRemoveEvent),
        fork(watchUpdateEvent),
        fork(watchSyncEvent),
        fork(watchAddEvent),
        fork(watchIncViewEvent),
        fork(watchSaveEvents),
        fork(watchGetCategories),
        fork(watchGetPages),
        fork(watchGetUsers),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchCheckStatus),
        fork(watchAggregateFB),
        fork(watchChild),
        fork(watchPromo),
        fork(watchAttention),
        fork(watchGetAuthors),
        fork(watchTagsLookup)
    ]);
}
