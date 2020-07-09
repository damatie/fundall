import * as Actions from '../actions';

const initialState = {
  pendingLeaves: [],
  approvedLeaves: [],
  reviewedLeaves: [],
  success: false,
  error: false,
  loading: false,
};

export const leavesReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_PENDING_LEAVE_REQUEST: {
      return {
        ...state,
        pendingLeaves: actions.payload,
        loading: false,
      }
    }
    case Actions.GET_APPROVED_LEAVE_REQUEST: {
      return {
        ...state,
        approvedLeaves: actions.payload,
        loading: false
      }
    }
    case Actions.GET_REVIEWED_LEAVE_REQUEST: {
      return {
        ...state,
        reviewedLeaves: actions.payload
      }
    }
    case Actions.LOADING_LEAVE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.LEAVE_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      }
    }
    case Actions.LEAVE_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        success: false,
        error: true
      }
    }
    default: {
      return state;
    }
  }
};