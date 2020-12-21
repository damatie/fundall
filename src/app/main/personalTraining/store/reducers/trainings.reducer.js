import * as Actions from '../actions';

const initialState = {
	loading: true,
	data: [],
	pendingTrainings: [],
	approvedTrainings: [],
	completedTrainings: [],
	rejectedTrainings: [],
	pendingPersonalTrainings: [],
	reviewedPersonalTrainings: [],
	approvedPersonalTrainings: [],
	completedPersonalTrainings: [],
	rejectedPersonalTrainings: [],
	events: [],
	trainings: [],
	entities: [],
	department: [],
	roles: [],
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
				trainings: action.trainings,
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
		case Actions.GET_ENTITIES:
			return {
				...state,
				entities: action.payload
			};
		case Actions.GET_DEPARTMENTS:
			return {
				...state,
				department: action.payload
			};
		case Actions.GET_ROLES:
			return {
				...state,
				roles: action.payload
			};
		case Actions.PENDING_TRAININGS_HR:
			return {
				...state,
				pendingTrainings: action.payload
			};
		case Actions.REVIEWED_TRAININGS_HR:
			return {
				...state,
				reviewedTrainings: action.payload
			};
		case Actions.APPROVED_TRAININGS_HR:
			return {
				...state,
				approvedTrainings: action.payload
			};
		case Actions.COMPLETED_TRAININGS_HR:
			return {
				...state,
				completedTrainings: action.payload
			};
		case Actions.REJECTED_TRAININGS_HR:
			return {
				...state,
				rejectedTrainings: action.payload
			};

		// personal trainings
		case Actions.PENDING_TRAININGS_PERSONAL:
			return {
				...state,
				pendingPersonalTrainings: action.payload
			};
		case Actions.APPROVED_TRAININGS_PERSONAL:
			return {
				...state,
				approvedPersonalTrainings: action.payload
			};
		case Actions.REVIEWED_TRAININGS_PERSONAL:
			return {
				...state,
				reviewedPersonalTrainings: action.payload
			};
		case Actions.COMPLETED_TRAININGS_PERSONAL:
			return {
				...state,
				completedPersonalTrainings: action.payload
			};
		case Actions.REJECTED_TRAININGS_PERSONAL:
			return {
				...state,
				rejectedPersonalTrainings: action.payload
			};
		default: {
			return state;
		}
	}
};

export default trainingsReducer;
