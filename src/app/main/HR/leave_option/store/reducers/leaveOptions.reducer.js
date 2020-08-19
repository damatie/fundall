import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: '',
	loading: false,
	success: false,
};

const leaveOptionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_LEAVE_OPTIONS: {
			return {
				...state,
				data: action.payload,
				loading: false,
				success: true
			};
		}
		case Actions.LOADING_LEAVE_OPTIONS: {
			return {
				...state,
				loading: true
			}
		}
		case Actions.SET_LEAVE_OPTIONS_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		default: {
			return state;
		}
	}
};

export default leaveOptionsReducer;
