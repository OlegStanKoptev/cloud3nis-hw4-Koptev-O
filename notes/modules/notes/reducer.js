import {types} from './actions';

const initialState = {
  notes: [],
  isLoading: false,
  isLoaded: false,
  updateList: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_NOTES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.LOAD_NOTES_SUCCESS: {
      const {notes} = action;
      return {
        ...state,
        notes: notes,
        isLoading: false,
        isLoaded: true,
      };
    }
    case types.LOAD_NOTES_FAILURE: {
      const {error} = action;
      console.log(error);
      return {
        ...state,
        isLoading: false,
      };
    }
    case types.UPDATE_LIST: {
      return {...state, updateList: !state.updateList};
    }
    case types.CREATE_NOTE: {
      return {...state};
    }
    case types.UPDATE_NOTE: {
      const {note} = action;
      const notes = state.notes;
      const noteIndex = notes.findIndex(e => e.id === note.id);
      if (note.title) {
        notes[noteIndex].title = note.title;
      }
      if (note.content) {
        notes[noteIndex].content = note.content;
      }
      if (note.image) {
        notes[noteIndex].image = note.image;
      }
      return {...state, notes: notes};
    }
    case types.DELETE_NOTE: {
      const {noteId} = action;
      const notes = state.notes;
      notes.splice(
        notes.findIndex(e => e.id === noteId),
        1,
      );
      return {...state, notes: notes};
    }
    default: {
      return state;
    }
  }
};
