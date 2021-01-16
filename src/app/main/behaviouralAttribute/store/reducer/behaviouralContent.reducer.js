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
  details: {},
  singleData: {},
  type: 'update',
  isUpdate: false,
  id: null
}

const behaviouralContentReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_ALL_BEHAVIOURAL_CONTENT:
      return {
        ...state,
        loading: false,
        data: actions.payload.contents,
        singleData: actions.payload,
        id: actions.payload.id
      }
    case OPEN_BEHAVIOURAL_CONTENT_MODAL:
      return {
        ...state,
        open: true,
      }
    case CLOSE_BEHAVIOURAL_CONTENT_MODAL:
      return {
        ...state,
        open: false,
        details: {},
        isUpdate: false
      }
    case GET_ONE_BEHAVIOURAL_CONTENT:
      return {
        ...state,
        details: actions.payload,
        isUpdate: true
      }
    default:
      return {
        ...state
      }
  }
};

export default behaviouralContentReducer;
