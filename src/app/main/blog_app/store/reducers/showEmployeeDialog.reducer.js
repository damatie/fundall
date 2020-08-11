import * as Actions from '../actions';

const initialState = {
	success: false,
  loading: false,
  show: false,
  error: {},
  data: [],
};

const showEmployeeDialog = (state = initialState, action) => {
	switch (action.type) {
    case Actions.SHOW_EMPLOYEE_DIALOG_LOADING: {
			return {
				...state,
				show: true,
        loading: true,
			};
		}
		case Actions.SHOW_EMPLOYEE_DIALOG_SUCCESS: {
			return {
				...state,
				success: true,
        loading: false,
        data: action.payload
			};
		}
		case Actions.HIDE_EMPLOYEE_DIALOG_LOADING: {
			return {
				...state,
        loading: false,
        show: false,
			};
		}
		case Actions.FILTER_EMPLOYEE: {
      const newData = state.data.filter(employee => employee);
			return {
				...state,
        data: newData,
			};
		}
		case Actions.SHOW_EMPLOYEE_DIALOG_ERROR: {
			return {
				...state,
				error: action.payload,
				loading: false
			};
		}
		default: {
			return state;
		}
	}
};

export default showEmployeeDialog;