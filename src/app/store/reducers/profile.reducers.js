import * as Actions from '../actions';

const initialState = {
  loading: false,
  success: true,
  data: {}
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
    default: {
      return state;
    }
  }
}