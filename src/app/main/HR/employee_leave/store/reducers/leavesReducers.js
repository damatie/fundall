import * as Actions from '../actions';

const initialState = {
  data: [],
  success: false,
  loading: false,
  error: false
}

export const leaveReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_LEAVE_DAYS: {
      return {
        ...state,
        data: actions.payload,
        loading: false,
      }
    }
    case Actions.LEAVE_DAYS_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.LEAVE_DAYS_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        error: false
      }
    }
    case Actions.LEAVE_DAYS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      }
    }
    default: {
      return state;
    }
  }
}