import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: {},
	success: false,
	updated: false
};

const EmployeeInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_EMPLOYEE_INFORMATION: {
			return {
			  ...state,
				loading: true,
				success: false,
				updated: false
			}
		}
		case Actions.GET_EMPLOYEE_INFORMATION_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case Actions.GET_EMPLOYEE_INFORMATION_ERROR: {
			return {
				...state,
				loading: false,
				data: {},
			};
		}
		case Actions.ADD_EMPLOYEE_INFORMATION_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true
			};
		}
		case Actions.ADD_EMPLOYEE_INFORMATION_ERROR: {
			return {
				...state,
				loading: false,
			};
		}
		case Actions.UPDATE_EMPLOYEE_INFORMATION_SUCCESS: {
			return {
				...state,
				loading: false,
				updated: true
			};
		}
		case Actions.UPDATE_EMPLOYEE_INFORMATION_ERROR: {
			return {
				...state,
				loading: false,
			};
		}
		default: {
			return state;
		}
	}
};

export default EmployeeInfoReducer;
