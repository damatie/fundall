import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: {},
  error: null,
  success: false,
};

const departmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_DEPARTMENT: {
			return {
				...state,
        data: action.payload,
        loading: false,
        error: null,
			};
		}
		case Actions.SAVE_DEPARTMENT: {
			return {
				...state,
        loading: false,
        error: null,
        success: true
			};
    }
    case Actions.DEPARTMENT_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      }
    }
    case Actions.DEPARTMENT_ERROR: {
			return {
				...state,
        loading: false,
        error: action.payload,
        success: false
			};
    }
    case Actions.UPDATE_DEPARTMENT: {
      return {
        ...state,
        loading: false,
        success: true
      }
    }
		default: {
			return state;
		}
	}
};

export default departmentReducer;
