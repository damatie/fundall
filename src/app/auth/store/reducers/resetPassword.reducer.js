import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {
		email: null
	}
};

const forgotPassword = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FORGOT_PASSWORD_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false,
			};
		}
		case Actions.FORGOT_PASSWORD_ERROR: {
			return {
				success: false,
				error: action.payload,
				loading: false,
			};
		}
		case Actions.FORGOT_PASSWORD_LOADING: {
			return {
				...initialState,
				success: false,
				loading: true,
			}
		}
		default: {
			return state;
		}
	}
};

export default forgotPassword;
