import { fork, all } from 'redux-saga/effects';
import { watchSearchMedia, watchGetImageDetails, watchGetEvents } from './watchers';


export default function* root() {
    yield all([
        fork(watchSearchMedia),
        fork(watchGetImageDetails),
        fork(watchGetEvents)
    ]);
}
