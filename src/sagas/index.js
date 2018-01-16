import { fork, all } from 'redux-saga/effects';
import {
    watchSearchMedia,
    watchGetImageDetails,
    watchGetEvents,
    watchSaveEvents,
    watchGetCategories,
    watchGetPages,
    watchGetUsers,
    watchLogin,
    watchLogout,
    watchCheckStatus,
    watchAggregateFB
} from './watchers';


export default function* root() {
    yield all([
        fork(watchSearchMedia),
        fork(watchGetImageDetails),
        fork(watchGetEvents),
        fork(watchSaveEvents),
        fork(watchGetCategories),
        fork(watchGetPages),
        fork(watchGetUsers),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchCheckStatus),
        fork(watchAggregateFB)
    ]);
}
