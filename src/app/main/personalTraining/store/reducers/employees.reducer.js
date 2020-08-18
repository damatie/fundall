import * as Actions from '../actions';

const initialState = {
	loading: true,
	employees: [],
	success: false
};

const employeesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_EMPLOYEES: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_EMPLOYEES: {
			return {
			...state,
			loading: false,
			employees: action.payload
			}
		}
		default: {
			return state;
		}
	}
};

export default employeesReducer;
