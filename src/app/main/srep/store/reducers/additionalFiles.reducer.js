import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	success: false,
	endorsedSuccess: false,
	emailSuccess: false,
	boardSuccess: false,
	endorsedId: 0,
	emailIndemnityId: 0,
	boardResolutionId: 0
};

const additionalReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_SREP: {
			return {
			  ...state,
			  loading: true,
			}
    }
		case Actions.GET_SREP_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				success: true

			};
		case Actions.GET_SREP_ERROR:
			return {
				...state,
				loading: false,
				data: [],
				success: false
			};
		case Actions.ADD_ENDORSED_FILES_SUCCESS:
			return {
				...state,
				loading: false,
				endorsedSuccess: true,
				endorsedId: action.endorsedId
			};
		case Actions.ADD_ENDORSED_FILES_ERROR:
			return {
				...state,
				loading: false,
				endorsedSuccess: false,
				endorsedId: 0
			};
		case Actions.ADD_EMAIL_FILES_SUCCESS:
			return {
				...state,
				loading: false,
				emailSuccess: true,
				emailIndemnityId: action.emailIndemnityId
			};
		case Actions.ADD_EMAIL_FILES_ERROR:
			return {
				...state,
				loading: false,
				emailSuccess: false,
				emailIndemnityId: 0
			};
		case Actions.ADD_BOARD_FILES_SUCCESS:
			return {
				...state,
				loading: false,
				boardSuccess: true,
				boardResolutionId: action.boardResolutionId
			};
		case Actions.ADD_BOARD_FILES_ERROR:
			return {
				...state,
				loading: false,
				boardSuccess: false,
				boardResolutionId: 0
			};
		default: {
			return state;
		}
	}
};

export default additionalReducer;
