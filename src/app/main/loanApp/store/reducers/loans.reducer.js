import * as Actions from '../actions';

const initialState = {
  pendingLoan: [],
  approvedLoan: [],
  loanHistory: [],
  loading: false,
  openLoan: [],
  closedLoan: [],
  reviewedLoan: [],
};

export const loansReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_ALL_APPROVED_LOAN: {
      return {
        ...state,
        loading: false,
        approvedLoan: actions.payload
      }
    }
    case Actions.GET_ALL_PENDING_LOAN: {
      return {
        ...state,
        loading: false,
        pendingLoan: actions.payload
      }
    }
    case Actions.GET_ALL_OPEN_LOAN: {
      return {
        ...state,
        loading: false,
        openLoan: actions.payload
      }
    }
    case Actions.GET_ALL_CLOSED_LOAN: {
      return {
        ...state,
        loading: false,
        closedLoan: actions.payload
      }
    }
    case Actions.EMPLOYEE_LOAN_HISTORY: {
      return {
        ...state,
        loading: false,
        loanHistory: actions.payload
      }
    }
    case Actions.LOADING_LOANS: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.GET_ALL_REVIEWED_LOAN: {
      return {
        ...state,
        loading: false,
        reviewedLoan: actions.payload
      }
    }
    default: {
      return state
    }
  }
}