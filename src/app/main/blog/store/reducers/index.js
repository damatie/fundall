import { combineReducers } from 'redux';
import posts from './posts.reducer';
import comments from './comments.reducer';
import categories from './categories.reducer';

const reducer = combineReducers({
	posts,
	comments,
	categories
});

export default reducer;
