import { GET_ALL_BEHAVIOURAL_ATTRIBUTE, GET_ONE_BEHAVIOURAL_ATTRIBUTE } from '../actions';

const initialState = {
  laoding: true,
  data: [],
  singleData: []
};

const behaviouralAttribute = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_ALL_BEHAVIOURAL_ATTRIBUTE:
      return {
        ...state,
        data: actions.payload
      }
    case GET_ONE_BEHAVIOURAL_ATTRIBUTE:
      return {
        ...state,
        singleData: actions.payload
      }
    default: {
      return state;
    }
  }
};

export default behaviouralAttribute;