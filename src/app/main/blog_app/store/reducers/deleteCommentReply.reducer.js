import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
};

const deleteAReply = (state = initialState, action) => {
	switch (action.type) {
		case Actions.DELETE_COMMENT_REPLY_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.DELETE_COMMENT_REPLY_LOADING: {
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

export default deleteAReply;