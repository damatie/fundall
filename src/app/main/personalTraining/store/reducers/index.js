import { combineReducers } from 'redux';
import events from './events.reducer';
import courses from './courses.reducer';
import trainings from './trainings.reducer';
import employees from './employees.reducer';

const reducer = combineReducers({
	events,
	courses,
	trainings,
	employees
});

export default reducer;
