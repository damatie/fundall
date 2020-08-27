import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false
};

const questionReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_QUESTION: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_QUESTION:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case Actions.CREATE_QUESTION_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.CREATE_QUESTION_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_QUESTION_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.UPDATE_QUESTION_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_QUESTION_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.DELETE_QUESTION_ERROR:
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

export default questionReducer;
