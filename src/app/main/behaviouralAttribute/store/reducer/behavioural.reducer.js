import { GET_ALL_BEHAVIOURAL_ATTRIBUTE, CLOSE_BEHAVIOURAL_MODAL, OPEN_BEHAVIOURAL_MODAL, GET_ONE_BEHAVIOURAL_ATTRIBUTE } from '../actions';

const initialState = {
  open: false,
  loading: true,
  data: [],
  singleData: {},
  type: 'new'
}

const behaviouralReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_ALL_BEHAVIOURAL_ATTRIBUTE:
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    case CLOSE_BEHAVIOURAL_MODAL:
      return {
        ...state,
        open: false,
        type: actions.payload
      }
    case OPEN_BEHAVIOURAL_MODAL:
      return {
        ...state,
        open: true,
        type: actions.payload
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

export default behaviouralReducer;