import { combineReducers } from 'redux';
import events from './events.reducer';
import courses from './courses.reducer';
import trainings from './trainings.reducer';
import employees from './employees.reducer';
import checkListForm from './checkListForm.reducer';

const reducer = combineReducers({
	events,
	courses,
	trainings,
	employees,
	checkListForm
});

export default reducer;
