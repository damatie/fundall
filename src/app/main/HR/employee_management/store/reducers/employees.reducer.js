import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: '',
	update: false,
	succeess: false,
};

const employeesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_EMPLOYEES: {
			return {
				...state,
				data: action.payload,
				success: true,
			};
		}
		case Actions.SET_EMPLOYEES_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.UPDATE_EMPLOYEES: {
			return {
				...state,
				update: !state.update,
				success: false
			}
		}
		default: {
			return state;
		}
	}
};

export default employeesReducer;
