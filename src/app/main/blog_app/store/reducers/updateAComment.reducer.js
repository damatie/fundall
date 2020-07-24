import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const updateAComment = (state = initialState, action) => {
	switch (action.type) {
		case Actions.UPDATE_A_COMMENT_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false
			};
		}
		case Actions.UPDATE_A_COMMENT_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.UPDATE_A_COMMENT_LOADING: {
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

export default updateAComment;