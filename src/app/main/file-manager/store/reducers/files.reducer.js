import _ from '@lodash';
import * as Actions from '../actions';
const initialState = {
	loading: true,
	data: [],
	success: true,
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
				data: action.payload
			};
		case Actions.CREATE_FILE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload
			};
		case Actions.CREATE_FILE_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_FILE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload
			};
		case Actions.UPDATE_FILE_ERROR:
			return {
				...state,
				loading: false,
				success: false,
			};	
		case Actions.DELETE_FILE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload
			};	
		case Actions.DELETE_FILE_ERROR:
			return {
				...state,
				loading: false,
				success: false
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
