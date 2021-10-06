import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false,
	updated: false
};

const nextofkinReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_NEXT_OF_KIN: {
			return {
			  ...state,
				loading: true,
				success: false,
				updated: false
			}
		}
		case Actions.GET_ALL_NEXT_OF_KIN_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case Actions.GET_ALL_NEXT_OF_KIN_ERROR: {
			return {
				...state,
				loading: false,
				data: [],
			};
		}
		case Actions.ADD_NEXT_OF_KIN_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true
			};
		}
		case Actions.ADD_NEXT_OF_KIN_ERROR: {
			return {
				...state,
				loading: false,
			};
		}
		case Actions.UPDATE_NEXT_OF_KIN_SUCCESS: {
			return {
				...state,
				loading: false,
				updated: true
			};
		}
		case Actions.UPDATE_NEXT_OF_KIN_ERROR: {
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

export default nextofkinReducer;
