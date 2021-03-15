import { combineReducers } from 'redux';
import srep from './srep.reducer';
import srepDashboard from './srepDashboard.reducer';
import additionalFiles from './additionalFiles.reducer';

const reducer = combineReducers({
  srep,
  srepDashboard,
  additionalFiles
});

export default reducer;