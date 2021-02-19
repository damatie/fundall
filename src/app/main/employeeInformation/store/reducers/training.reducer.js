import { GET_TRAINING_EXPERTISE } from '../actions';

const initialState = {
  loading: true,
  data: [],
};

const trainingReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_TRAINING_EXPERTISE:
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    default:
      return state
  }
};

export default trainingReducer;