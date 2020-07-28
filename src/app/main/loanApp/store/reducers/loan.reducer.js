import * as Actions from '../actions';

const initialState = {
  loading: true,
  loadings: false,
  success: false,
  error: false,
  data: {},
  updating: false,
  closing: false,
}

export const loanReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOAN_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
        loadings: false
      }
    }
    case Actions.LOADING_LOAN: {
      return {
        ...state,
        loading: true,
        loadings: true,
      }
    }
    case Actions.LOAN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        loadings: false
      }
    }
    case Actions.GET_LOAN: {
      return {
        ...state,
        loading: false,
        loadings: false,
        data: actions.payload
      }
    }
    case Actions.UPDATING_LOAN: {
      return {
        ...state,
        updating: true,
      }
    }
    case Actions.UPDATE_SUCCESS: {
      return {
        ...state,
        updating: false,
        success: true,
      }
    }
    case Actions.CLOSING_LOAN: {
      return {
        ...state,
        closing: true,
      }
    }
    case Actions.CLOSED_SUCCESS: {
      return {
        ...state,
        closing: false,
        success: true,
      }
    }
    default: {
      return state
    }
  }
};