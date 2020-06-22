import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const employeeReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_EMPLOYEE: {
			return {
				...state,
        data: action.payload,
        loading: false,
        error: null,
			};
		}
		case Actions.SAVE_EMPLOYEE: {
			return {
				...state,
        loading: false,
        error: null,
        success: true
			};
    }
    case Actions.EMPLOYEE_LOADING: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    case Actions.EMPLOYEE_ERROR: {
			return {
				...state,
        loading: false,
        error: action.payload
			};
    }
		default: {
			return state;
		}
	}
};

export default employeeReducer;
