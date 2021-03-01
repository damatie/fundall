import {
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_PROMOTION_HISTORY,
  SINGLE_PROMOTION_HISTORY,
} from '../actions';

const initialState = {
  open: false,
  loading: true,
  data: [],
  single: {},
}

const promotionHistoryReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        open: false,
        single: {},
      }
    case GET_PROMOTION_HISTORY:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      }
    case SINGLE_PROMOTION_HISTORY:
      return {
        ...state,
        single: actions.payload,
        open: true,
      }
    default:
      return state;
  }
};

export default promotionHistoryReducer;