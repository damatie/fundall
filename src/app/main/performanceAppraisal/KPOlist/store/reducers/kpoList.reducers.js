import { CLOSE_EMPLOYEE_KPO_LIST_MODAL, OPEN_EMPLOYEE_KPO_LIST_MODAL } from '../actions';

const initialState = {
  open: false,
  kpoList: [],
  loading: true,
};

const kpoListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_EMPLOYEE_KPO_LIST_MODAL:
      return {
        ...state,
        open: true,
      }
    case CLOSE_EMPLOYEE_KPO_LIST_MODAL:
      return {
        ...state,
        open: false
      }
    default: {
      return state
    }
  }
}

export default kpoListReducer;