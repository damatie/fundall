import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
	data: [],
};

const GetOneBlogPost = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GETONEBLOGPOST_SUCCESS: {
			return {
				...initialState,
				loading: false,
				data: action.payload
			};
		}
		case Actions.GETONEBLOGPOST_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.GETONEBLOGPOST_LOADING: {
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

export default GetOneBlogPost;