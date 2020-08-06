import { combineReducers } from 'redux';
import events from './events.reducer';
import courses from './courses.reducer';
import trainings from './trainings.reducer';

const reducer = combineReducers({
	events,
	courses,
	trainings
});

export default reducer;
