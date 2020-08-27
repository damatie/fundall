import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false
};

const answerReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_ANSWER: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_ANSWER:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case Actions.CREATE_ANSWER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.CREATE_ANSWER_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_ANSWER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.UPDATE_ANSWER_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.APPROVE_ANSWER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.APPROVE_ANSWER_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_ANSWER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.DELETE_ANSWER_ERROR:
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

export default answerReducer;
