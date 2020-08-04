import * as Actions from '../actions';

const initialState = {
	loading: true,
	totalCourses: [],
	approvedCourses: [],
	rejectedCourses: [],
	pendingCourses: [],
	courseCategories: [],
	success: false
};

const projectsReducer = (state = initialState, action) => {
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
		case Actions.GET_APPROVED_COURSES:
			return {
				...state,
				loading: false,
				approvedCourses: action.payload
			};
		case Actions.GET_REJECTED_COURSES:
			return {
				...state,
				loading: false,
				rejectedCourses: action.payload
			};
		case Actions.GET_PENDING_COURSES:
			return {
				...state,
				loading: false,
				pendingCourses: action.payload
			};
		case Actions.GET_COURSE_CATEGORIES:
			return {
				...state,
				loading: false,
				courseCategories: action.payload
			};
		case Actions.APPROVE_COURSES_SUCCESS:
			return {
				...state,
				loading: false,
				approvedCourses: action.approved,
				rejectedCourses: action.rejected,
				pendingCourses: action.pending,
				success: true
			};
		case Actions.APPROVE_COURSES_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.REJECT_COURSES_SUCCESS:
			return {
				...state,
				loading: false,
				approvedCourses: action.approved,
				rejectedCourses: action.rejected,
				pendingCourses: action.pending,
				success: true
			};
		case Actions.REJECT_COURSES_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		default:
			return state;
	}
};

export default projectsReducer;
