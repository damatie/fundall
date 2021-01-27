import * as Actions from '../actions';

const initialState = {
  open: false,
}

const employeesReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.OPEN_ADD_NEW_EMPLOYEE_MODAL:
      return {
        ...state,
        open: true,
      }
    case Actions.CLOSE_ADD_NEW_EMPLOYEE_MODAL:
      return {
        ...state,
        open: false,
      }
    default:
      return state;
  }
};

export default employeesReducer;