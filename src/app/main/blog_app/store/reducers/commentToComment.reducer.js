import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const CommentToComment = (state = initialState, action) => {
	switch (action.type) {
		case Actions.COMMENT_TO_COMMENT_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false
			};
		}
		case Actions.COMMENT_TO_COMMENT_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.COMMENT_TO_COMMENT_LOADING: {
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

export default CommentToComment;