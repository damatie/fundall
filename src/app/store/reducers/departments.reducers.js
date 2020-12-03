import * as Actions from '../actions';

const initialState = {
  data: [],
  success: false,
  loading: false,
  deparmentList: [],
}

export const departmentReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.DEPARTMENTS_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.GET_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
        deparmentList: actions.payload
      }
    }
    case Actions.GET_DEPARTMENTS_ERROR: {
      return {
        ...state,
        success: false,
        loading: false,
        deparmentList: []
      }
    }
    default: {
      return state
    }
  }
}