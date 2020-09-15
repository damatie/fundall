import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false
};

const candidateReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_CANDIDATE: {
			return {
			  ...state,
				loading: true,
				success: false,
			}
    }
    case Actions.GET_ALL_CANDIDATE_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
      };
    }
    case Actions.ADD_CANDIDATE_ERROR: {
			return {
				...state,
				loading: false,
				success: false
      };
    }
		case Actions.ADD_CANDIDATE_SUCCESS: {
			return {
				...state,
				loading: false,
      };
    }
		case Actions.ADD_CANDIDATE_ERROR: {
			return {
				...state,
				loading: false,
				success: false
      };
		}
		case Actions.UPDATE_CANDIDATE_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true,
			}
		}
		default: {
			return state;
		}
	}
};

export default candidateReducer;
