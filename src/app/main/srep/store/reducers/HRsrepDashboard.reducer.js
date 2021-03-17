import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false
};

const HRsrepDashboardReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_DASHBOARD_SREP: {
			return {
			  ...state,
			  loading: true,
			  data: []
			}
        }
		case Actions.GET_DASHBOARD_SREP_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				success: true
			};
		case Actions.GET_DASHBOARD_SREP_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				success: false
			};
		case Actions.LOADING_DEPARTMENTS:
			return {
				...state,
				loading: true,
			  	data: []
			};
		case Actions.GET_DEPARTMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				success: true
			};
		case Actions.GET_DEPARTMENTS_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				success: false
			};
		case Actions.LOADING_DASHBOARD_EMPLOYEE_SREP:
			return {
				...state,
				loading: true,
					data: []
			};
		case Actions.GET_DASHBOARD_EMPLOYEE_SREP_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				success: true
			};
		case Actions.GET_DASHBOARD_EMPLOYEE_SREP_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				success: false
			};
		case Actions.LOADING_DASHBOARD_ID_SREP:
			return {
				...state,
				loading: true,
				data: []
			};
		case Actions.GET_DASHBOARD_SREP_ID_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				success: true
			};
		case Actions.GET_DASHBOARD_SREP_ID_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				success: false
			};
		case Actions.DASHBOARD_ENTITIES_LOADING:
			return {
				...state,
				loading: true,
				data: []
			};
		case Actions.GET_DASHBOARD_ENTITIES_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				success: true
			};
		case Actions.GET_DASHBOARD_ENTITIES_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				success: false
			};
		default: {
			return state;
		}
	}
};

export default HRsrepDashboardReducer;
