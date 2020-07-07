import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: [],
  update: false
};

export const leaveDaysReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_LEAVE_DAYS: {
      return {
        ...state,
        data: actions.payload,
        loading: false
      }
    }
    case Actions.LOADING_LEAVE_DAYS: {
      return {
        ...state,
        loading: true
      }
    }
    default: {
      return state;
    }
  }
};