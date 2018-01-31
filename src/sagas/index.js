import { fork, all } from 'redux-saga/effects';
import {
    watchGetEvents,
    watchGetEvent,
    watchRemoveEvent,
    watchUpdateEvent,
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
    watchMostviewed
} from './watchers';


export default function* root() {
    yield all([
        fork(watchGetEvents),
        fork(watchGetEvent),
        fork(watchRemoveEvent),
        fork(watchUpdateEvent),
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
        fork(watchMostviewed)
    ]);
}
