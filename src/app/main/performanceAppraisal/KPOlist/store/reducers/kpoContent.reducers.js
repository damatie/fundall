import { OPEN_ADD_KPO_CONTENT_MODAL, CLOSE_ADD_KPO_CONTENT_MODAL, GET_ALL_KPO_CONTENT, GET_ONE_KPO_CONTENT } from '../actions';

const initialState = {
  open: false,
  loading: true,
  data: [],
  kpoContent: {}
};

const kpoContentReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_ADD_KPO_CONTENT_MODAL:
      return {
        ...state,
        open: true
      }
    case CLOSE_ADD_KPO_CONTENT_MODAL:
      return {
        ...state,
        open: false
      }
    case GET_ALL_KPO_CONTENT:
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    case GET_ONE_KPO_CONTENT:
      return {
        ...state,
        kpoContent: actions.payload
      }
    default: {
      return state
    }
  }
};

export default kpoContentReducer;