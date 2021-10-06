import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false,
	updated: false
};

const EmergencyContactReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_EMERGENCY_CONTACT: {
			return {
			  ...state,
				loading: true,
				success: false,
				updated: false
			}
		}
		case Actions.GET_ALL_EMERGENCY_CONTACT_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case Actions.GET_ALL_EMERGENCY_CONTACT_ERROR: {
			return {
				...state,
				loading: false,
				data: [],
			};
		}
		case Actions.ADD_EMERGENCY_CONTACT_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true
			};
		}
		case Actions.ADD_EMERGENCY_CONTACT_ERROR: {
			return {
				...state,
				loading: false,
			};
		}
		case Actions.UPDATE_EMERGENCY_CONTACT_SUCCESS: {
			return {
				...state,
				loading: false,
				updated: true
			};
		}
		case Actions.UPDATE_EMERGENCY_CONTACT_ERROR: {
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
