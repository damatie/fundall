import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false,
	updated: false
};

const EmergencyContactReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_EDUCATION_QUALIFICATION: {
			return {
			  ...state,
				loading: true,
				success: false,
				updated: false
			}
		}
		case Actions.GET_ALL_EDUCATION_QUALIFICATION_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case Actions.GET_ALL_EDUCATION_QUALIFICATION_ERROR: {
			return {
				...state,
				loading: false,
				data: [],
			};
		}
		case Actions.ADD_EDUCATION_QUALIFICATION_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true
			};
		}
		case Actions.ADD_EDUCATION_QUALIFICATION_ERROR: {
			return {
				...state,
				loading: false,
			};
		}
		case Actions.UPDATE_EDUCATION_QUALIFICATION_SUCCESS: {
			return {
				...state,
				loading: false,
				updated: true
			};
		}
		case Actions.UPDATE_EDUCATION_QUALIFICATION_ERROR: {
			return {
				...state,
				loading: false,
			};
		}
		default: {
			return state;
		}
	}
};

export default EmergencyContactReducer;
