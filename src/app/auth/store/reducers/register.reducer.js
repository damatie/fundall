import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {
		username: null,
		password: null
	}
};

const register = (state = initialState, action) => {
	switch (action.type) {
		case Actions.REGISTER_SUCCESS: {
			return {
				...initialState,
				success: true,
				loading: false,
			};
		}
		case Actions.REGISTER_ERROR: {
			return {
				success: false,
				error: action.payload,
				loading: false,
			};
		}
		case Actions.REGISTER_LOADING: {
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

export default register;
