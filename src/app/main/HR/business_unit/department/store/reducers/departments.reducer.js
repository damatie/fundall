import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: ''
};

const departmentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_DEPARTMENTS: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SET_DEPARTMENTS_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		default: {
			return state;
		}
	}
};

export default departmentsReducer;
