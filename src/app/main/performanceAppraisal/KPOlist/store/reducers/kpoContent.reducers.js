import { OPEN_ADD_KPO_CONTENT_MODAL, CLOSE_ADD_KPO_CONTENT_MODAL } from '../actions';

const initialState = {
  open: false,
  loading: true,
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
    default: {
      return state
    }
  }
};

export default kpoContentReducer;