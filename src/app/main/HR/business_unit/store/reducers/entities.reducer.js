import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: ''
};

const entitiesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_ENTITIES: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SET_ENTITIES_SEARCH_TEXT: {
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

export default entitiesReducer;
