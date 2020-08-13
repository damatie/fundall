import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false
};

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_COMMENTS: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_COMMENTS:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case Actions.GET_ONE_COMMENT:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case Actions.CREATE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload
			};
		case Actions.CREATE_COMMENT_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.LIKE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.LIKE_COMMENT_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.DELETE_COMMENT_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.UPDATE_COMMENT_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_COMMENT_REPLY_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.UPDATE_COMMENT_REPLY_ERROR:
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

export default postsReducer;
