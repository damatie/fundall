import _ from '@lodash';
import * as Actions from '../actions';
const initialState = {
	loading: true,
	categories: [],
	success: true,
	searchText: ''
  }
const filesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_CATEGORIES: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_CATEGORIES:
			return {
				...state,
				loading: false,
				categories: action.payload
			};
		case Actions.CREATE_CATEGORY_SUCCESS:
			return {
				...state,
				loading: false,
				sucess: true,
				categories: action.payload
			};
		case Actions.CREATE_CATEGORY_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_CATEGORY_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				categories: action.payload
			};
		case Actions.UPDATE_CATEGORY_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_CATEGORY_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				categories: action.payload
			};
		case Actions.DELETE_CATEGORY_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.SET_CATEGORY_SEARCH_TEXT: 
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
