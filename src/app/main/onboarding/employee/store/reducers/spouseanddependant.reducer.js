import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false,
	updated: false
};

const spouseanddependantReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_SPOUSE_AND_DEPENDANT: {
			return {
			  ...state,
				loading: true,
				success: false,
				updated: false
			}
		}
		case Actions.GET_ALL_SPOUSE_AND_DEPENDANT_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case Actions.GET_ALL_SPOUSE_AND_DEPENDANT_ERROR: {
			return {
				...state,
				loading: false,
				data: [],
			};
		}
		case Actions.ADD_SPOUSE_AND_DEPENDANT_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true
			};
		}
		case Actions.ADD_SPOUSE_AND_DEPENDANT_ERROR: {
			return {
				...state,
				loading: false,
			};
		}
		case Actions.UPDATE_SPOUSE_AND_DEPENDANT_SUCCESS: {
			return {
				...state,
				loading: false,
				updated: true
			};
		}
		case Actions.UPDATE_SPOUSE_AND_DEPENDANT_ERROR: {
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

export default spouseanddependantReducer;
