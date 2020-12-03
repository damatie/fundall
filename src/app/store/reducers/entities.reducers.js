import * as Actions from '../actions';

const initialState = {
  data: [],
  success: false,
  loading: false,
  entityList: [],
}

export const entityListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.ENTITIES_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case Actions.GET_ENTITIES_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
        entityList: actions.payload
      }
    }
    case Actions.GET_ENTITIES_ERROR: {
      return {
        ...state,
        success: false,
        loading: false,
        entityList: []
      }
    }
    default: {
      return state
    }
  }
}