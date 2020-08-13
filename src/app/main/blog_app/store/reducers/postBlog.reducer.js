import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const BlogPost = (state = initialState, action) => {
	switch (action.type) {
		case Actions.BlogPost_SUCCESS: {
			return {
				...state,
				success: true,
				loading: false
			};
		}
		case Actions.BlogPost_ERROR: {
			return {
				...state,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.BlogPost_LOADING: {
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

export default BlogPost;