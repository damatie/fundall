import { GET_NEXT_OF_KIN } from '../actions';

const initialState = {
  loading: true,
  data: [],
};

const nextOfKinReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_NEXT_OF_KIN:
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    default:
      return state
  }
};

export default nextOfKinReducer;