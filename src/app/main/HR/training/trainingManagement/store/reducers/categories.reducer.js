import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false
};

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_CATEGORIES: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_CATEGORIES:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case Actions.CREATE_COURSE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload
			};
		case Actions.CREATE_COURSE_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_COURSE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload
			};
		case Actions.DELETE_COURSE_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		default:
			return state;
	}
};

export default categoriesReducer;
