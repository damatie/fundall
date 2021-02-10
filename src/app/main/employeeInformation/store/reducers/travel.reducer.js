import { GET_TRAVEL_VACATION } from '../actions';

const initialState = {
  loading: true,
  data: [],
};

const travelReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_TRAVEL_VACATION:
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    default:
      return state
  }
};

export default travelReducer;