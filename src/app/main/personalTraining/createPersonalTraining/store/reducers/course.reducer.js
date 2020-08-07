import * as Actions from '../actions';

const initialState = {
	loading: true,
	courses: [],
	categories: [],
	success: false
};

const courseReducer = (state = initialState, action) => {
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
				courses: action.payload
			};
		case Actions.GET_COURSE_CATEGORIES:
			return {
				...state,
				loading: false,
				categories: action.payload
			};
		case Actions.GET_COURSE: {
			return {
				...action.payload
			};
		}
		case Actions.SAVE_COURSE: {
			return {
				...action.payload
			};
		}
		case Actions.UPDATE_COURSE: {
			return {
				...state,
				...action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default courseReducer;
