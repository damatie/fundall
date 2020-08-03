import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: {},
  updating: false,
  creating: false,
  success: false,
};

export const employeeInfoReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_EMPLOYEE_INFO: {
      return {
        ...state,
        data: actions.payload,
        loading: false,
      }
    }
    case Actions.LOADING_EMPLOYEE_INFO: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.UPDATING_EMPLOYEE_INFO: {
      return {
        ...state,
        updating: true,
        success: false,
      }
    }
    case Actions.UPDATE_EMPLOYEE_INFO: {
      return {
        ...state,
        updating: false,
        success: true,
      }
    }
    case Actions.CREATING_EMPLOYEE_INFO: {
      return {
        ...state,
        creating: true,
        success: false,
      }
    }
    case Actions.CREATE_EMPLOYEE_INFO: {
      return {
        ...state,
        success: true,
        creating: false,
      }
    }
    default: {
      return state;
    }
  }
};