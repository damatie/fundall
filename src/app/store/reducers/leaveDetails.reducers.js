import * as Actions from '../actions';

const initialState = {
  data: {},
  loading: false,
  success: false,
  error: false,
}

export const leaveDetailsReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_LEAVE_REQUEST_DETAILS: {
      return {
        ...state,
        data: actions.payload
      }
    }
    case Actions.LOADING_LEAVE_REQUEST_DETAILS: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.LEAVE_REQUEST_SUCCESS: {
      return {
        ...state,
        success: true,
      }
    }
    case Actions.LEAVE_REQUEST_ERROR: {
      return {
        ...state,
        error: true,
      }
    }
    default: {
      return state;
    }
  }
};