import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {
		username: null,
		password: null
	}
};

const login = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOGIN_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false
			};
		}
		case Actions.LOGIN_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.LOGIN_LOADING: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: true
			};
		}
		default: {
			return state;
		}
	}
};

export default login;
