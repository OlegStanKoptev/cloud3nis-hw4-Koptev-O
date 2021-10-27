import {takeEvery, put} from 'redux-saga/effects';
import * as api from '../../lib/api-client';
import {
  loadNotes,
  loadNotesFailure,
  loadNotesSuccess,
  types as t,
  updateList,
} from './actions';

function* loadNotesSaga() {
  try {
    const res = yield api.getNotes();
    const notes = res.data;
    yield put(loadNotesSuccess(notes));
  } catch (error) {
    yield put(loadNotesFailure(error.toString()));
  }
}

function* createNoteSaga(action) {
  console.log('Sagas CREATE_NOTE');
  try {
    yield api.createNote(action.note);
  } catch (error) {
    console.log('error: ' + error);
  }
  yield put(loadNotes());
}

function* updateNoteSaga(action) {
  try {
    yield api.updateNote(action.note);
  } catch (error) {
    console.log('error: ' + error);
  }
  yield put(updateList());
}

export default function* notesSaga() {
  yield takeEvery(t.LOAD_NOTES_REQUEST, loadNotesSaga);
  yield takeEvery(t.UPDATE_NOTE, updateNoteSaga);
  yield takeEvery(t.CREATE_NOTE, createNoteSaga);
}
