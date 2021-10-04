import * as Actions from '../actions';

const initialState = {
	loading: false,
	oneLoading: false,
	open: false,
	showButton: false,
	showEdit: false,
	data: [],
	oneCandidate: [],
	success: false
};

const candidateReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.OPEN_CREATE_CANDIDATE_OPENING_MODAL: {
			return {
				...state,
				open: true,
			}
		}
		case Actions.CLOSE_CREATE_CANDIDATE_OPENING_MODAL: {
			return {
				...state,
				open: false,
			}
		}
		case Actions.SHOW_SHORTLIST_BUTTON: {
			return {
				...state,
				showButton: true,
			}
		}
		case Actions.HIDE_SHORTLIST_BUTTON: {
			return {
				...state,
				showButton: false,
			}
		}
		case Actions.SHOW_EDIT_FORM: {
			return {
				...state,
				showEdit: true,
			}
		}
		case Actions.HIDE_EDIT_FORM: {
			return {
				...state,
				showEdit: false,
			}
		}
		case Actions.LOADING_CANDIDATE: {
			return {
			  ...state,
				loading: true,
				success: false,
			}
		}
		case Actions.LOADING_ONE_CANDIDATE: {
			return {
			  ...state,
				oneLoading: true,
				success: false,
			}
		}
		case Actions.GET_ALL_CANDIDATE_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		}
		case Actions.GET_ALL_CANDIDATE_ERROR: {
			return {
				...state,
				loading: false,
				data: [],
			};
		}
		case Actions.GET_ONE_CANDIDATE_SUCCESS: {
			return {
				...state,
				oneLoading: false,
				oneCandidate: action.payload,
			};
		}
		case Actions.GET_ONE_CANDIDATE_ERROR: {
			return {
				...state,
				oneLoading: false,
				oneCandidate: [],
			};
		}
		case Actions.ADD_CANDIDATE_ERROR: {
			return {
				...state,
				loading: false,
				success: false
			};
		}
		case Actions.ADD_CANDIDATE_SUCCESS: {
			return {
				...state,
				loading: false,
			};
		}
		case Actions.ADD_CANDIDATE_ERROR: {
			return {
				...state,
				loading: false,
				success: false
      		};
		}
		case Actions.UPDATE_CANDIDATE_SUCCESS: {
			return {
				...state,
				loading: false,
				success: true,
			}
		}
		case Actions.DELETE_CANDIDATE_SUCCESS: {
			const newData = state.data.filter(candidate => candidate.id !== action.payload);
			return {
				...state,
				loading: false,
				success: true,
				data: newData,
			}
		}
		default: {
			return state;
		}
	}
};

export default candidateReducer;
