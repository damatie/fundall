import * as Actions from '../actions';

const initialState = {
  pendingLoan: [],
  approvedLoan: [],
  loanHistory: [],
  pendingLoanHistory: [],
  reviewedLoanHistory: [],
  rejectedLoanHistory: [],
  correctedLoanHistory: [],
  disbursedLoanHistory: [],
  approvedLoanHistory: [],
  closedLoanHistory: [],
  loading: false,
  openLoan: [],
  closedLoan: [],
  reviewedLoan: [],
  returnedLoan: [],
  disbursedLoan: []
};

export const loansReducer = (state = initialState, actions) => {
  switch (actions.type) {
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
    case Actions.GET_RETURNED_LOAN: {
      return {
        ...state,
        loading: false,
        returnedLoan: actions.payload
      }
    }
    case Actions.GET_DISBURSED_LOAN: {
      return {
        ...state,
        loading: false,
        disbursedLoan: actions.payload
      }
    }
    case Actions.GET_ALL_CLOSED_LOAN: {
      return {
        ...state,
        loading: false,
        closedLoan: actions.payload
      }
    }
    case Actions.EMPLOYEE_DISBURSED_LOAN_HISTORY: {
      return {
        ...state,
        loading: false,
        disbursedLoanHistory: actions.payload
      }
    }
    case Actions.EMPLOYEE_CORRECTED_LOAN_HISTORY: {
      return {
        ...state,
        loading: false,
        correctedLoanHistory: actions.payload
      }
    }
    case Actions.EMPLOYEE_REVIEWED_LOAN_HISTORY: {
      return {
        ...state,
        loading: false,
        reviewedLoanHistory: actions.payload
      }
    }
    case Actions.EMPLOYEE_PENDING_LOAN_HISTORY: {
      return {
        ...state,
        loading: false,
        pendingLoanHistory: actions.payload
      }
    }
    case Actions.EMPLOYEE_REJECTED_LOAN_HISTORY: {
      return {
        ...state,
        loading: false,
        rejectedLoanHistory: actions.payload
      }
    }
    case Actions.EMPLOYEE_APPROVED_LOAN_HISTORY: {
      return {
        ...state,
        loading: false,
        approvedLoanHistory: actions.payload
      }
    }
    case Actions.EMPLOYEE_CLOSED_LOAN_HISTORY: {
      return {
        ...state,
        loading: false,
        closedLoanHistory: actions.payload
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