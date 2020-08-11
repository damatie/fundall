import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const CommentToPost = (state = initialState, action) => {
	switch (action.type) {
		case Actions.COMMENT_TO_POST_LOADING: {
			return {
				...initialState,
				success: false,
				loading: true
			};
		}
		case Actions.COMMENT_TO_POST_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false,
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
		default: {
			return state;
		}
	}
};

export default CommentToPost;