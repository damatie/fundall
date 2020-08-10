import * as Actions from '../actions';

const initialState = {
	like: false,
	error: {},
};

const likeAndUnlikeBlogPost = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LIKE_AND_UNLIKE_BLOGPOST_ERROR: {
			return {
				...initialState,
			};
		}
		default: {
			return state;
		}
	}
};

export default likeAndUnlikeBlogPost;