import { GET_SPOUSE_DEPENDANTS } from '../actions';

const initialState = {
  loading: true,
  data: [],
};

const spouseDependantReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_SPOUSE_DEPENDANTS:
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    default:
      return state
  }
};

export default spouseDependantReducer;