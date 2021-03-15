import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false
};

const srepDashboardReducer = (state = initialState, action) => {
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
		default: {
			return state;
		}
	}
};

export default srepDashboardReducer;
