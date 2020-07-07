import { combineReducers } from 'redux';
import events from './events.reducer';
import { leaveDaysReducers } from './leaveDays.reducers';
import { leaveRequestReducers } from './leaveRequest.reducers';

const reducer = combineReducers({
	events,
	leaveDays: leaveDaysReducers,
	leaveRequest: leaveRequestReducers
});

export default reducer;
