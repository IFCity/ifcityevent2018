import { fork, all } from 'redux-saga/effects';
import { watchSearchMedia, watchGetImageDetails, watchGetEvents, watchLogin, watchLogout, watchCheckStatus } from './watchers';


export default function* root() {
    yield all([
        fork(watchSearchMedia),
        fork(watchGetImageDetails),
        fork(watchGetEvents),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchCheckStatus)
    ]);
}
