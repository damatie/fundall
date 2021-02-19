import { GET_EMERGENCY_CONTACTS } from '../actions';

const initialState = {
  loading: true,
  data: [],
};

const emergencyContactReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_EMERGENCY_CONTACTS:
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    default:
      return state
  }
};

export default emergencyContactReducer;