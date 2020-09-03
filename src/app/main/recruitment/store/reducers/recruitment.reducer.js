import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false,
};

const recruitmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_ALL_OPEN_POSITIONS_LOADING: {
			return {
				...state,
				loading: true,
			}
		}
		case Actions.GET_ALL_OPEN_POSITIONS_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload,
			}
		}
		case Actions.GET_ALL_OPEN_POSITIONS_ERROR: {
			return {
				...state,
				loading: false,
				success: false,
				data: [],
			};
		}
		case Actions.CREATE_OPENING_LOADING: {
			return {
			  ...state,
			  loading: true,
			}
    }
		case Actions.CREATE_OPENING_SUCCESS: {
			return {
				...state,
        loading: false,
        succcess: true,
			};
		}
		case Actions.CREATE_OPENING_ERROR: {
			return {
				...state,
				loading: false,
				success: false
			};
		}
		default: {
			return state;
		}
	}
};

export default recruitmentReducer;
