import {fork} from 'redux-saga/effects';
import notesSaga from './notes/sagas';

export default function* rootSaga() {
  yield fork(notesSaga);
}
