import { combineReducers } from 'redux';
import files from './files.reducer';
import selectedItemId from './selectedItemIdReducer';
import searchText from './searchTextReducer';

const reducer = combineReducers({
	files,
	selectedItemId,
	searchText
});

export default reducer;
