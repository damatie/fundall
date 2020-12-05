import * as Actions from '../actions';

const initialState = {
  data: [],
  success: false,
  loading: false,
  roleList: [],
}

export const roleListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.ROLES_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.GET_ROLES_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
        roleList: actions.payload
      }
    }
    case Actions.GET_ROLES_ERROR: {
      return {
        ...state,
        success: false,
        loading: false,
        roleList: []
      }
    }
    default: {
      return state
    }
  }
}