import * as Actions from '../actions';

const initialState = {
  loading: true,
  loadings: false,
  success: false,
  error: false,
  data: {}
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
    default: {
      return state
    }
  }
};