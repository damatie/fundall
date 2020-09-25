import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false
};

const srepReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_SREP: {
			return {
			  ...state,
			  loading: true,
			  data: []
			}
    }
		case Actions.GET_SREP_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				success: true

			};
		case Actions.GET_SREP_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				success: false
			};
		case Actions.APPLY_SREP_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.APPLY_SREP_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.APPROVE_SREP_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.APPROVE_SREP_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.REJECT_SREP_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.REJECT_SREP_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_SREP_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.DELETE_SREP_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.SEND_TO_FINANCE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.SEND_TO_FINANCE_ERROR:
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

export default srepReducer;
