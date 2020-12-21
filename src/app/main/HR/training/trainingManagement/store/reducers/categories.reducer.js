import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false,
	roles: [],
	departments: [],
	entities: []
};

const categoriesReducer = (state = initialState, action) => {
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
				data: action.payload
			};
		case Actions.GET_ROLES:
			return {
				...state,
				loading: false,
				roles: action.payload
			};
		case Actions.GET_ENTITIES:
			return {
				...state,
				loading: false,
				entities: action.payload
			};
		case Actions.GET_DEPARTMENTS:
			return {
				...state,
				loading: false,
				departments: action.payload
			};
		case Actions.CREATE_COURSE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload
			};
		case Actions.CREATE_COURSE_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_COURSE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload
			};
		case Actions.DELETE_COURSE_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		default:
			return state;
	}
};

export default categoriesReducer;
