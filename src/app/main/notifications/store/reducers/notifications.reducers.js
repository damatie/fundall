import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: [],
  length: 0,
};

export const notificationsReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_NOTIFICATIONS: {
      return {
        ...state,
        loading: true
      }
    }
    case Actions.GET_NOTIFICATIONS: {
      return {
        ...state,
        loading: false,
        data: actions.payload,
        length: actions.payload.length
      }
    }
    default: {
      return state;
    }
  }
};