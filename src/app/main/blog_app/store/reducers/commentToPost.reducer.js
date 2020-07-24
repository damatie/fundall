import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const CommentToPost = (state = initialState, action) => {
	switch (action.type) {
		case Actions.COMMENT_TO_POST_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false,
				data: action.payload
			};
		}
		case Actions.COMMENT_TO_POST_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.COMMENT_TO_POST_LOADING: {
			return {
				...initialState,
				success: false,
				loading: true
			};
		}
		default: {
			return state;
		}
	}
};

export default CommentToPost;