import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
	data: '',
};

const DeleteComment = (state = initialState, action) => {
	switch (action.type) {
		case Actions.DELETE_COMMENT_SUCCESS: {
			return {
				...initialState,
				loading: false,
				data: action.payload
			};
		}
		case Actions.DELETE_COMMENT_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.DELETE_COMMENT_LOADING: {
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

export default DeleteComment;
