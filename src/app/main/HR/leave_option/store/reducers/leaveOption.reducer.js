import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const leaveOptionReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_LEAVE_OPTIONS: {
			return {
				...state,
        data: action.payload,
        loading: false,
        error: null,
			};
		}
		case Actions.SAVE_LEAVE_OPTIONS: {
			return {
				...state,
        loading: false,
        error: null,
        success: true
			};
    }
    case Actions.LEAVE_OPTIONS_LOADING: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    case Actions.LEAVE_OPTIONS_ERROR: {
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

export default leaveOptionReducer;
