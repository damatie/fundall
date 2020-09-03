import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	success: false
};

const trainingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_ENTITIES: {
			return {
			  ...state,
			  loading: true,
			}
    }
		case Actions.GET_ENTITIES_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		case Actions.GET_ENTITIES_ERROR:
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
