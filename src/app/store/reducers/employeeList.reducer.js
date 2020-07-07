import * as Actions from '../actions';

const initialState = {
  data: [],
  success: false,
  loading: false,
  error: false,
  update: false,
}

export const employeeListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_DEPARTMENT_EMPLOYEES : {
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    }
    case Actions.EMPLOYEE_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.GET_DEPARTMENT_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        success: true,
        error: false,
        loading: false,
        update: !state.update
      }
    }
    case Actions.GET_DEPARTMENT_EMPLOYEES_ERROR: {
      return {
        ...state,
        success: false,
        error: true,
        loading: false,
      }
    }
    case Actions.RESET_DEPARTMENT_EMPLOYEE_LIST: {
      return {
        ...state,
        update: !state.update,
        data: []
      }
    }
    default: {
      return state
    }
  }
}