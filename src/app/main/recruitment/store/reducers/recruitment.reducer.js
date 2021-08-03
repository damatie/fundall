import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	onePosition: [],
	success: false,
	open: false,
	close: false
};

const recruitmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.OPEN_CREATE_OPENING_MODAL: {
			return {
				...state,
				open: true,
			}
		}
		case Actions.CLOSE_CREATE_OPENING_MODAL: {
			return {
				...state,
				open: false,
			}
		}
		case Actions.LOADING_POSITIONS: {
			return {
				...state,
				loading: true,
			}
		}
		case Actions.ClOSE_SUCCESS: {
			return {
				...state,
				loading: false,
				close: true
			}
		}
		case Actions.GET_ALL_OPEN_POSITIONS_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true,
				data: action.payload,
			}
		}
		case Actions.GET_ALL_OPEN_POSITIONS_ERROR: {
			return {
				...state,
				loading: false,
				success: false,
				data: [],
			};
		}
		case Actions.GET_ONE_OPEN_POSITIONS_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true,
				onePosition: action.payload,
			}
		}
		case Actions.GET_ONE_OPEN_POSITIONS_ERROR: {
			return {
				...state,
				loading: false,
				success: false,
				onePosition: [],
			};
		}
		case Actions.CREATE_OPENING_SUCCESS: {
			return {
				...state,
				loading: false,
				succcess: true,
			};
		}
		case Actions.CREATE_OPENING_ERROR: {
			return {
				...state,
				loading: false,
				success: false
			};
		}
		case Actions.ASSIGN_RECRUITER_SUCCESS: {
			return {
				...state,
        loading: false,
        succcess: true,
			};
		}
		case Actions.ASSIGN_RECRUITER_ERROR: {
			return {
				...state,
				loading: false,
				success: false
			};
		}
		case Actions.DELETE_OPENING_SUCCESS: {
			const newData = state.data.filter(position => position.id !== action.payload);
			return {
				...state,
        loading: false,
				succcess: true,
				data: newData,
			};
		}
		case Actions.UPDATE_OPENING_SUCCESS: {
			let newData = state.data.map(position => {return {...position}})
			let newPosition = newData.find(position => position.id === action.payload.id);
			newPosition = action.payload;
			return {
				...state,
        loading: false,
				succcess: true,
				data: newData,
			};
		}
		default: {
			return state;
		}
	}
};

export default recruitmentReducer;
