import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false
};

const checkListReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_CHECK_LIST: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_CHECK_LIST:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case Actions.CREATE_CHECK_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.CREATE_CHECK_LIST_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_CHECK_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.UPDATE_CHECK_LIST_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_CHECK_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.DELETE_CHECK_LIST_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		default: {
			return state;
		}
	}
};

export default checkListReducer;
