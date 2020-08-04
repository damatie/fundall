import { combineReducers } from 'redux';
import trainings from './trainings.reducer';
import widgets from './widgets.reducer';
import courses from './courses.reducer';

const reducer = combineReducers({
	widgets,
	trainings,
	courses
});

export default reducer;
