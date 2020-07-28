import * as Actions from '../actions';

const initialState = {
  loadingSA: false,
  loadingApprovedSA: false,
  loadingOpenSA: false,
  loadingClosedSA: false,
  pendingSA: [],
  approvedSA: [],
  openSA: [],
  closedSA: [],
};

export const salaryAdvanceLoansReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_SA: {
      return {
        ...state,
        loadingSA: true,
      }
    }
    case Actions.GET_PENDING_SA: {
      return {
        ...state,
        loadingSA: false,
        pendingSA: actions.payload
      }
    }
    case Actions.LOADING_APPROVED_SA: {
      return {
        ...state,
        loadingApprovedSA: true,
      }
    }
    case Actions.GET_PENDING_SA: {
      return {
        ...state,
        loadingApprovedSA: false,
        approvedSA: actions.payload
      }
    }
    case Actions.LOADING_OPEN_SA: {
      return {
        ...state,
        loadingOpenSA: true,
      }
    }
    case Actions.GET_PENDING_SA: {
      return {
        ...state,
        loadingOpenSA: false,
        openSA: actions.payload
      }
    }
    case Actions.LOADING_CLOSED_SA: {
      return {
        ...state,
        loadingClosedSA: true,
      }
    }
    case Actions.GET_PENDING_SA: {
      return {
        ...state,
        loadingClosedSA: false,
        closedSA: actions.payload
      }
    }
    default: {
      return state;
    }
  }
};