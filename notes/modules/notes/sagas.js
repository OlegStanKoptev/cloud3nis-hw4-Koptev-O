import {takeEvery, put} from 'redux-saga/effects';
import * as api from '../../lib/api-client';
import {
  loadNotes,
  loadNotesFailure,
  loadNotesSuccess,
  types as t,
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
  try {
    yield api.createNote(action.note);
    yield put(loadNotes());
  } catch (error) {
    console.log('error: ' + error);
  }
}

function* updateNoteSaga(action) {
  try {
    yield api.updateNote(action.note);
  } catch (error) {
    console.log('error: ' + error);
  }
}

export default function* notesSaga() {
  yield takeEvery(t.LOAD_NOTES_REQUEST, loadNotesSaga);
  yield takeEvery(t.UPDATE_NOTE, updateNoteSaga);
  yield takeEvery(t.CREATE_NOTE, createNoteSaga);
}
