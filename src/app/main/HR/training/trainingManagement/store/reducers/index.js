import { combineReducers } from 'redux';
import categories from './categories.reducer';
import courses from './courses.reducer';

const reducer = combineReducers({
	categories,
	courses
});

export default reducer;
