import * as Actions from '../actions';

const initialState = {
  loading: true,
  data: {},
  error: null,
  success: false,
};

const leaveTypeReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_ONE_LEAVE_TYPE: {
			return {
				...state,
        data: action.payload,
        loading: false,
        error: null,
			};
		}
		case Actions.SAVE_LEAVE_TYPE: {
			return {
				...state,
        loading: false,
        error: null,
        success: true
			};
    }
    case Actions.LEAVE_TYPE_LOADING: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    case Actions.LEAVE_TYPE_ERROR: {
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

export default leaveTypeReducer;
