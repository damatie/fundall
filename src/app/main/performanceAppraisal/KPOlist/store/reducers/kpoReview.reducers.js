import {
	GET_KPO_BY_DEPT,
	GET_ASSIGNED_KPO,
	GET_ENTITIES,
	GET_ALL_ENITIES,
	GET_KPO_BY_ROLE,
	OPEN_REQUEST_KPO_MODAL,
	CLOSE_REQUEST_KPO_MODAL,
	GET_ALL_KPOS_BY_LINE_MANAGER
} from '../actions';

const initialState = {
	deptKpo: [],
	loading: true,
	assignedKpo: [],
	entities: [],
	entityList: [],
	kpoRequest: [],
	open: false,
	details: {},
	kposToReviewByLineManager: []
};

const kpoReviewReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case GET_KPO_BY_DEPT:
			return {
				...state,
				loading: false,
				deptKpo: actions.payload
			};
		case GET_KPO_BY_ROLE:
			return {
				...state,
				kpoRequest: actions.payload
			};
		case GET_ASSIGNED_KPO:
			return {
				...state,
				assignedKpo: actions.payload
			};
		case GET_ENTITIES:
			return {
				...state,
				entities: actions.payload
			};
		case GET_ALL_ENITIES:
			return {
				...state,
				entityList: actions.payload
			};
		case GET_ALL_KPOS_BY_LINE_MANAGER:
			return {
				...state,
				kposToReviewByLineManager: actions.payload
			};
		case OPEN_REQUEST_KPO_MODAL:
			return {
				...state,
				open: true,
				details: actions.payload
			};
		case CLOSE_REQUEST_KPO_MODAL:
			return {
				...state,
				open: false,
				details: {}
			};
		default: {
			return {
				...state
			};
		}
	}
};

export default kpoReviewReducer;
