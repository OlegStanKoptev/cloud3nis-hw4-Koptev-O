import notes from './notes/reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  notes,
});

export default rootReducer;
