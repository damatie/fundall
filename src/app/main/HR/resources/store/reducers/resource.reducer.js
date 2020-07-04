import * as Actions from '../actions';

const initialState = {
  loading: false,
  error: false,
  success: false,
};

export const resourceReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_RESOURCE: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.CREATE_RESOURCE_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true
      }
    }
    case Actions.CREATE_RESOURCE_ERROR: {
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