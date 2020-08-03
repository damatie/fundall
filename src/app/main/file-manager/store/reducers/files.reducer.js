import _ from '@lodash';
import * as Actions from '../actions';
const initialState = {
	loading: true,
	data: [],
	searchText: ''
  }
const filesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_FILES: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_FILES:
			return {
				...state,
				loading: false,
				data: _.keyBy(action.payload, 'id')
			};
		case Actions.CREATE_FILE_SUCCESS:
			return {
				...state,
				loading: false,
				data: _.keyBy(action.payload, 'id')
			};
		case Actions.UPDATE_FILE_SUCCESS:
			return {
				...state,
				loading: false,
				data: _.keyBy(action.payload, 'id')
			};
		case Actions.DELETE_FILE_SUCCESS:
			return {
				...state,
				loading: false,
				data: _.keyBy(action.payload, 'id')
			};
		case Actions.SET_FILE_SEARCH_TEXT: 
		return {
			...state,
			loading: false,
			searchText: action.searchText
		};
		default:
			return state;
	}
};

export default filesReducer;
