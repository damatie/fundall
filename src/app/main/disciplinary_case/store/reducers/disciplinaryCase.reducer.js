import _ from '@lodash';
import * as Actions from '../actions';
const initialState = {
	loading: true,
	data: [],
	success: true
  }
const disciplinaryCase = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_DISCIPLINARY_CASE: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_DISCIPLINARY_CASE:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case Actions.CREATE_DISCIPLINARY_CASE_SUCCESS:
			return {
				...state,
				loading: false,
				sucess: true
			};
		case Actions.CREATE_DISCIPLINARY_CASE_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_DISCIPLINARY_CASE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.UPDATE_DISCIPLINARY_CASE_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_DISCIPLINARY_CASE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.DELETE_DISCIPLINARY_CASE_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		default:
			return state;
	}
};

export default disciplinaryCase;
