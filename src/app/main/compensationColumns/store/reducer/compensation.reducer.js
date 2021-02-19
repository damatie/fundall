import { 
  GET_COMPENSATION_COLUMNS,
  OPEN_COMPENSATION_COLUMNS_MODAL,
  CLOSE_COMPENSATION_COLUMNS_MODAL, 
  GET_ONE_COMPENSATION_COLUMN
} from '../actions';

const initialState = {
  loading: true,
  data: [],
  open: false,
  type: 'new',
  details: {},
};

const compensationReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_COMPENSATION_COLUMNS:
      return {
        ...state,
        loading: false,
        data: actions.payload,
      }
    case OPEN_COMPENSATION_COLUMNS_MODAL:
      return {
        ...state,
        open: true,
      }
    case CLOSE_COMPENSATION_COLUMNS_MODAL:
      return {
        ...state,
        open: false,
        type: 'new',
        details: {}
      }
    case GET_ONE_COMPENSATION_COLUMN:
      return {
        ...state,
        open: true,
        type: 'details',
        details: actions.payload
      }
    default:
      return state;
  }
};

export default compensationReducer;