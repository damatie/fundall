import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false
};

const checkListFormReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_FORM: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_FORM:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case Actions.CREATE_FORM_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.CREATE_FORM_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_FORM_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.UPDATE_FORM_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		default: {
			return state;
		}
	}
};

export default checkListFormReducer;
