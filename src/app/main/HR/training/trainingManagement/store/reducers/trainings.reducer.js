import * as Actions from '../actions';

const initialState = {
	loading: true,
	totalTrainings: [],
	approvedTrainings: [],
	rejectedTrainings: [],
	pendingTrainings: [],
	reviewedTrainings: [],
	success: false
};

const trainingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_TRAINIING: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_APPROVED_TRAINING:
			return {
				...state,
				loading: false,
				approvedTrainings: action.payload
			};
		case Actions.GET_REJECTED_TRAINING:
			return {
				...state,
				loading: false,
				rejectedTrainings: action.payload
			};
		case Actions.GET_PENDING_TRAINING:
			return {
				...state,
				loading: false,
				pendingTrainings: action.payload
			};
		case Actions.GET_REVIEWED_TRAINING:
			return {
				...state,
				loading: false,
				reviewedTrainings: action.payload
			};
		default:
			return state;
	}
};

export default trainingsReducer;
