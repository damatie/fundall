import * as Actions from '../actions';

const initialState = {
  success: false,
  loading: false,
  error: false,
  update: false,
}

export const leaveRequestReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.REQUEST_LEAVE_SUCCESS: {
      return {
        ...state,
        loading: false,
        succcess: true,
      }
    }
    case Actions.REQUEST_LEAVE_ERROR: {
      return {
        ...state,
        loading: false,
        success: false,
        error: true
      }
    }
    case Actions.UPDATE_LEAVE_REQUEST: {
      return {
        ...state,
        update: true,
        loading: false,
      }
    }
    default: {
      return state
    }
  }
}