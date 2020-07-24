import * as Actions from '../actions';

const initialState = {
	success: false,
	error: {},
};

const likeAndUnlikeBlogPost = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LIKE_AND_UNLIKE_BLOGPOST_SUCCESS: {
			return {
				...initialState,
				success: true,
			};
		}
		case Actions.LIKE_AND_UNLIKE_BLOGPOST_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};

export default likeAndUnlikeBlogPost;