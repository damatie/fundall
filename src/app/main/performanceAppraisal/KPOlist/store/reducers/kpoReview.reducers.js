import { GET_KPO_BY_DEPT, GET_ASSIGNED_KPO } from '../actions';

const initialState = {
  deptKpo: [],
  loading: true,
  assignedKpo: [],
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
        assignedKpo: actions.payload
      }
    default: {
      return {
        ...state
      }
    }
  }
};

export default kpoReviewReducer;