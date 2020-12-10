import { GET_KPO_BY_DEPT } from '../actions';

const initialState = {
  deptKpo: [],
  loading: true,
}

const kpoReviewReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_KPO_BY_DEPT:
      return {
        ...state,
        loading: false,
        deptKpo: actions.payload
      };
    default: {
      return {
        ...state
      }
    }
  }
};

export default kpoReviewReducer;