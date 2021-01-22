import { GET_KPO_BY_DEPT, GET_ASSIGNED_KPO, GET_ENTITIES, GET_KPO_BY_ROLE, OPEN_REQUEST_KPO_MODAL, CLOSE_REQUEST_KPO_MODAL } from '../actions';

const initialState = {
  deptKpo: [],
  loading: true,
  assignedKpo: [],
  entities: [],
  kpoRequest: [],
  open: false,
  details: {}
}

const kpoReviewReducer = (state = initialState, actions) => {
  switch(actions.type) {
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
      }
    case GET_ASSIGNED_KPO:
      return {
        ...state,
        assignedKpo: actions.payload,
      }
    case GET_ENTITIES:
      return {
        ...state,
        entities: actions.payload,
      }
    case OPEN_REQUEST_KPO_MODAL:
      return {
        ...state,
        open: true,
        details: actions.payload
      }
    case CLOSE_REQUEST_KPO_MODAL:
      return {
        ...state,
        open: false,
        details: {}
      }
    default: {
      return {
        ...state
      }
    }
  }
};

export default kpoReviewReducer;