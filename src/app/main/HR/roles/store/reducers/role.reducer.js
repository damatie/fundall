import * as Actions from '../actions';

const initialState = {
  loading: false,
  error: false,
  success: false,
};

export const roleReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_ROLE: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.CREATE_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true
      }
    }
    case Actions.CREATE_ROLE_ERROR: {
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
      }
    }
    default: {
      return state;
    }
  }
}