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
		default: {
			return state;
		}
	}
};

export default trainingsReducer;
