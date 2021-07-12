import * as Actions from '../actions';

const initialState = {
  menu: [],
  success: false,
  error: false,
  loading: false,
};

export const menuReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_USER_MENU: {
      return {
        ...state,
        menu: actions.payload,
        loading: false,
      }
    }
    case Actions.LOADING_USER_MENU: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.USER_MENU_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      }
    }
    case Actions.USER_MENU_ERROR: {
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