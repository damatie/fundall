import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: ''
};

const businessUnitsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_BUSINESS_UNITS: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SET_BUSINESS_UNITS_SEARCH_TEXT: {
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

export default businessUnitsReducer;
