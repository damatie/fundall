import * as Actions from '../actions';

const intialState = {
  loading: false,
  success: false,
  log: [],
  error: false,
  details: {},
  loadingDetails: false,
};

export const salaryAdvanceReducer = (state = intialState, actions) => {
  switch (actions.type) {
    case Actions.LOADING_SALARY_ADVANCE: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.GET_SALARY_ADVANCE: {
      return {
        ...state,
        loading: false,
        success: true,
        log: actions.payload
      }
    }
    case Actions.SALARY_ADVANCE_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
    case Actions.GET_SALARY_ADVANCE_DETAILS: {
      return {
        ...state,
        details: actions.payload,
        loadingDetails: false,
      }
    }
    case Actions.LOADING_SALARY_ADVANCE_DETAILS: {
      return {
        ...state,
        loadingDetails: true,
      }
    }
    default: {
      return state;
    }
  }
};