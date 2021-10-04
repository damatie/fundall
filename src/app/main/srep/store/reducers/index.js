import { combineReducers } from 'redux';
import srep from './srep.reducer';
import HRsrepDashboard from './HRsrepDashboard.reducer';
import additionalFiles from './additionalFiles.reducer';

const reducer = combineReducers({
  srep,
  HRsrepDashboard,
  additionalFiles
});

export default reducer;