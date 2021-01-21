import { GET_KPO_BY_DEPT, GET_ASSIGNED_KPO, GET_ENTITIES } from '../actions';

const initialState = {
  deptKpo: [],
  loading: true,
  assignedKpo: [],
  entities: [],
}

const kpoReviewReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_KPO_BY_DEPT:
      return {
        ...state,
        loading: false,
        deptKpo: actions.payload
      };
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
    default: {
      return {
        ...state
      }
    }
  }
};

export default kpoReviewReducer;