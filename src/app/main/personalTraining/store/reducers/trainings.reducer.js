import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	events: [],
	trainings: [],
	success: false
};

const trainingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_TRAININGS: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_TRAININGS:
			return {
				...state,
				loading: false,
				data: action.payload,
				events: action.events,
				trainings: action.trainings
			};
		case Actions.CREATE_TRAINING_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.CREATE_TRAINING_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_TRAINING_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			};
		case Actions.UPDATE_TRAINING_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		default: {
			return state;
		}
	}
};

export default trainingsReducer;
