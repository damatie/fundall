import { combineReducers } from 'redux';
import posts from './posts.reducer';
import comments from './comments.reducer';

const reducer = combineReducers({
	posts,
	comments
});

export default reducer;
