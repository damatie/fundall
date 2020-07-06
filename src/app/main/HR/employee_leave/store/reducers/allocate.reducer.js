import * as Actions from '../actions';

const initialState = {
  success: false,
  loading: false,
  error: false,
  update: false,
};

export const allocateReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.ALLOCATING: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.ALLOCATE_LEAVE_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        update: !state.update
      }
    }
    case Actions.ALLOCATE_LEAVE_ERROR: {
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
};