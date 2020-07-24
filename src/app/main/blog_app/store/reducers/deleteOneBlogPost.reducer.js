import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
	data: '',
};

const DeleteOneBlogPost = (state = initialState, action) => {
	switch (action.type) {
		case Actions.DELETEONEBLOGPOST_SUCCESS: {
			return {
				...initialState,
				loading: false,
				data: action.payload
			};
		}
		case Actions.DELETEONEBLOGPOST_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.DELETEONEBLOGPOST_LOADING: {
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

export default DeleteOneBlogPost;