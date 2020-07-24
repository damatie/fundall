import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const editCommentReply = (state = initialState, action) => {
	switch (action.type) {
		case Actions.EDIT_COMMENT_REPLY_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false
			};
		}
		case Actions.EDIT_COMMENT_REPLY_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.EDIT_COMMENT_REPLY_LOADING: {
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

export default editCommentReply;