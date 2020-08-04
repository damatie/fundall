import * as Actions from '../actions';

const initialState = {
  loading: false,
  success: false,
  data: {},
  updating: false,
  error: false,
}

export const profileReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_EMPLOYEE_PROFILE: {
      return {
        ...state,
        loading: false,
        data: actions.payload
      }
    }
    case Actions.LOADING_EMPLOYEE_PROFILE: {
      return {
        ...state,
        loading: true
      }
    }
    case Actions.UPDATING_EMPLOYEE_PROFILE: {
      return {
        ...state,
        updating: true,
      }
    }
    case Actions.UPDATE_EMPLOYEE_PROFILE: {
      return {
        ...state,
        updating: false,
        success: true,
      }
    }
    case Actions.ERROR: {
      return {
        ...state,
        error: false,
      }
    }
    default: {
      return state;
    }
  }
}