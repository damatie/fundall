import { combineReducers } from 'redux';
import leaveTypesReducer from './leaveTypes.reducer';
import leaveTypeReducer from './leaveType.reducer';

const reducer = combineReducers({
  leaveTypes: leaveTypesReducer,
  leaveType: leaveTypeReducer,
});

export default reducer;