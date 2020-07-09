import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: '',
	update: false
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
		case Actions.UPDATE_EMPLOYEES: {
			return {
				...state,
				update: !state.update
			}
		}
		default: {
			return state;
		}
	}
};

export default employeesReducer;
