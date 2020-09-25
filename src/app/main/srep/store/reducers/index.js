import { combineReducers } from 'redux';
import srep from './srep.reducer';
import additionalFiles from './additionalFiles.reducer';

const reducer = combineReducers({
  srep,
  additionalFiles
});

export default reducer;