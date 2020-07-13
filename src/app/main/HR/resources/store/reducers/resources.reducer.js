import * as Actions from '../actions';

const initialState = {
	data: [],
  searchText: '',
  loading: false,
  success: false,
  isDeleting: false,
};

export const resourcesReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_RESOURCES: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.GET_RESOURCES: {
      return {
        ...state,
        data: actions.payload,
        loading: false,
      }
    }
    case Actions.DELETING_RESOURCES: {
      return {
        ...state,
        isDeleting: !state.isDeleting,
      }
    }
    case Actions.SET_RESOURCES_SEARCH_TEXT: {
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