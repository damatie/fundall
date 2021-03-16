import { 
  GET_REFERENCE_DETAILS,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_DETAILS
} from '../actions';

const initialState = {
  loading: true,
  open: false,
  data: [],
  details: {},
}

const referenceDetailsReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_REFERENCE_DETAILS:
      return {
        ...state,
        loading: false,
        data: actions.payload,
      }
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        open: false,
        details: {},
      }
    case GET_DETAILS:
      return {
        ...state,
        open: true,
        details: actions.payload
      }
    default:
      return state;
  }
};

export default referenceDetailsReducer;