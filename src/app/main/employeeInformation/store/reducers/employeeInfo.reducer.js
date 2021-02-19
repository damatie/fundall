import { OPEN_SHARED_MODAL, CLOSE_SHARED_MODAL } from '../actions';

const initialState = {
  open: false,
  title: ''
};

const employeeInfoReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_SHARED_MODAL:
      return {
        ...state,
        title: actions.payload,
        open: true
      }
    case CLOSE_SHARED_MODAL:
      return {
        ...state,
        open: false,
        title: '',
      }
    default:
      return state;
  }
};

export default employeeInfoReducer