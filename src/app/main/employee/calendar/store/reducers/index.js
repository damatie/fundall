import { combineReducers } from 'redux';
import events from './events.reducer';
import { leaveDaysReducers } from './leaveDays.reducers';

const reducer = combineReducers({
	events,
	leaveDays: leaveDaysReducers
});

export default reducer;
