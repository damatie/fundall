import { combineReducers } from 'redux';
import categories from './categories.reducer';
import courses from './courses.reducer';
import trainings from './trainings.reducer';

const reducer = combineReducers({
	categories,
	courses,
	trainings
});

export default reducer;
