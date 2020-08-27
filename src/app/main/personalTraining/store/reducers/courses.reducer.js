import * as Actions from '../actions';

const initialState = {
	loading: true,
	courses: [],
	categories: [],
	totalNo: 0,
	success: false
};

const coursesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_COURSES: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.LOADING_COURSE_CATEGORIES: {
			return {
			...state,
			loading: true,
			}
		}
		case Actions.GET_COURSES:
			return {
				...state,
				loading: false,
				courses: action.payload,
				totalNo: action.totalNo
			};
		case Actions.GET_COURSE_CATEGORIES:
			return {
				...state,
				loading: false,
				categories: action.payload
			};
		default: {
			return state;
		}
	}
};

export default coursesReducer;
