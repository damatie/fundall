import { combineReducers } from 'redux';
import files from './files.reducer';
import categories from './categories.reducer';
import selectedItemId from './selectedItemIdReducer';

const reducer = combineReducers({
	files,
	selectedItemId,
	categories
});

export default reducer;
