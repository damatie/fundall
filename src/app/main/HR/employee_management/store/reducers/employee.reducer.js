import * as Actions from '../actions';
import { actions } from 'react-table';

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
  loadingInfo: false,
  loadingDetails: false,
  info: {},
  details: {},
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
    case Actions.LOADING_EMPLOYEE_DETAILS: {
      return {
        ...state,
        loadingDetails: true,
      };
    }
    case Actions.LOADING_EMPLOYEE_INFO: {
      return {
        ...state,
        loadingInfo: true,
      };
    }
    case Actions.EMPLOYEE_DETAILS: {
      return {
        ...state,
        loadingDetails: false,
        details: action.payload
      }
    };
    case Actions.EMPLOYEE_INFO: {
      return {
        ...state,
        loadingInfo: false,
        info: action.payload
      }
    };
		default: {
			return state;
		}
	}
};

export default employeeReducer;
