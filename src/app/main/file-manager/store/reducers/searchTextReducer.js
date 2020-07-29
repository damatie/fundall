import * as Actions from '../actions';

const searchTextReducer = (state = '1', action) => {
	switch (action.type) {
		case Actions.SET_FILE_SEARCH_TEXT:
			return action.searchText;
		default:
			return state;
	}
};

export default searchTextReducer;
