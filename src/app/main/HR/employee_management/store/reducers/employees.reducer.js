import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: ''
};

const employeesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_EMPLOYEES: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SET_EMPLOYEES_SEARCH_TEXT: {
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

export default employeesReducer;
