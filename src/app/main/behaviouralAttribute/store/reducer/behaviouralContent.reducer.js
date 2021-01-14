import { 
  GET_ALL_BEHAVIOURAL_CONTENT,
  OPEN_BEHAVIOURAL_CONTENT_MODAL,
  CLOSE_BEHAVIOURAL_CONTENT_MODAL,
  GET_ONE_BEHAVIOURAL_CONTENT
} from '../actions';

const initialState = {
  data: [],
  loading: true,
  pagination: {
    offset: 0,
    limit: 10,
    count: 0
  },
  open: false,
  details: {}
}

const behaviouralContentReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_ALL_BEHAVIOURAL_CONTENT:
      return {
        ...state,
        loading: false,
        data: actions.payload.rows,
        pagination: actions.payload.pagination
      }
    case OPEN_BEHAVIOURAL_CONTENT_MODAL:
      return {
        ...state,
        open: true
      }
    case CLOSE_BEHAVIOURAL_CONTENT_MODAL:
      return {
        ...state,
        open: false,
        details: {}
      }
    case GET_ONE_BEHAVIOURAL_CONTENT:
      return {
        ...state,
        details: actions.payload
      }
    default:
      return {
        ...state
      }
  }
};

export default behaviouralContentReducer;
