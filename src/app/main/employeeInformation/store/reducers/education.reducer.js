import { GET_EDUCATIONS } from '../actions';

const initialState = {
  loading: true,
  data: [],
};

const educationReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_EDUCATIONS:
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    default:
      return state
  }
};

export default educationReducer;