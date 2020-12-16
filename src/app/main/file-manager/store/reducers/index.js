import { combineReducers } from 'redux';
import categories from './categories.reducer';
import selectedItemId from './selectedItemIdReducer';
import folders from './folders.reducer'

const reducer = combineReducers({
	folders,
	selectedItemId,
	categories
});

export default reducer;
