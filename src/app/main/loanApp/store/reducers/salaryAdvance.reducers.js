import * as Actions from '../actions';

const initialState = {
  loading: false,
  error: false,
  success: false,
}

export const salaryAdvanceReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_SALARY_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case Actions.SALARY_REQUEST: {
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      }
    }
    case Actions.SALARY_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
    default: {
      return state;
    }
  }
};