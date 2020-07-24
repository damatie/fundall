import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const editBlog = (state = initialState, action) => {
	switch (action.type) {
		case Actions.EDITBLOG_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false
			};
		}
		case Actions.EDITBLOG_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.EDITBLOG_LOADING: {
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

export default editBlog;