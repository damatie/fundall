import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
	data: [],
};

const getBlogs = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GETBLOGS_SUCCESS: {
			return {
				...initialState,
				loading: false,
				data: action.payload
			};
		}
		case Actions.LIKE_AND_UNLIKE_BLOGPOST_SUCCESS: {
			const newData = state.data.map((post) => {
				if (post.id === action.payload.postId) post.likes.push(action.payload);
			})
			return {
				...initialState,
				success: false,
				loading: false,
				error: {},
				data: newData,
			};
		}
		case Actions.GETBLOGS_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.GETBLOGS_LOADING: {
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

export default getBlogs;