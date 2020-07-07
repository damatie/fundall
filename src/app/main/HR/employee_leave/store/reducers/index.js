import { combineReducers } from 'redux';
import { allocateReducer } from './allocate.reducer';
import { leaveReducers } from './leavesReducers';

const reducers = combineReducers({
  allocate: allocateReducer,
  leaveDays: leaveReducers,
});

export default reducers;