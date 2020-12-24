import * as Actions from '../actions';

const initialState = {
  loadingSA: false,
  loadingApprovedSA: false,
  loadingOpenSA: false,
  loadingClosedSA: false,
  loadingDisbursedSA: false,
  loadingReviewedSA: false,
  loadingReviewed2SA: false,
  pendingSA: [],
  approvedSA: [],
  openSA: [],
  closedSA: [],
  reviewedSA: [],
  reviewed2SA: [],
  disbursedSA: []
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
    case Actions.GET_APPROVED_SA: {
      return {
        ...state,
        loadingApprovedSA: false,
        approvedSA: actions.payload
      }
    }
    case Actions.LOADING_REVIEWED2_SA: {
      return {
        ...state,
        loadingReviewed2SA: true,
      }
    }
    case Actions.GET_REVIEWED2_SA: {
      return {
        ...state,
        loadingReviewed2SA: false,
        reviewed2SA: actions.payload
      }
    }
    case Actions.LOADING_OPEN_SA: {
      return {
        ...state,
        loadingOpenSA: true,
      }
    }
    case Actions.GET_OPEN_SA: {
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
    case Actions.GET_CLOSED_SA: {
      return {
        ...state,
        loadingClosedSA: false,
        closedSA: actions.payload
      }
    }
    case Actions.LOADING_REVIEWED_SA: {
      return {
        ...state,
        loadingReviewedSA: true,
      }
    }
    case Actions.GET_REVIEWED_SA: {
      return {
        ...state,
        loadingReviewedSA: false,
        reviewedSA: actions.payload
      }
    }
    case Actions.LOADING_DISBURSED_SA: {
      return {
        ...state,
        loadingDisbursedSA: true,
      }
    }
    case Actions.GET_DISBURSED_SA: {
      return {
        ...state,
        loadingDisbursedSA: true,
        disbursedSA: actions.payload
      }
    }
    default: {
      return state;
    }
  }
};