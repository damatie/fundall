import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const likeAComment = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LIKE_A_COMMENT_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false
			};
		}
		case Actions.LIKE_A_COMMENT_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.LIKE_A_COMMENT_LOADING: {
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

export default likeAComment;