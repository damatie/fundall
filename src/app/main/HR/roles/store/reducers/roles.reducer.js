import * as Actions from '../actions';

const initialState = {
	data: [],
  searchText: '',
  loading: false,
  success: false,
  isDeleting: false,
};

export const rolesReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_ROLES: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.GET_ROLES: {
      return {
        ...state,
        data: actions.payload,
        loading: false,
      }
    }
    case Actions.DELETING_ROLES: {
      return {
        ...state,
        isDeleting: true,
      }
    }
    case Actions.SET_ROLES_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
        success: true
      }
    }
    case Actions.RESET_ROLES: {
      return {
        ...state,
        success: false
      }
    }
    case Actions.SET_ROLES_SEARCH_TEXT: {
      return {
        ...state,
        searchText: actions.searchText
      }
    }
    default: {
      return state;
    }
  }
}