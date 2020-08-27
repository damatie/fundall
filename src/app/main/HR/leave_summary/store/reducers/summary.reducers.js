
import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: [],
  summary: {}
};

export const summaryReducers = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.LOADING_LEAVE_SUMMARY: {
      return {
        ...state,
        loading: true
      };
    };
    case Actions.GET_LEAVE_SUMMARY: {
      return {
        ...state,
        loading: false,
        data: actions.payload
      };
    };
    case Actions.GET_ONE_LEAVE_SUMMARY: {
      return {
        ...state,
        summary: actions.payload
      }
    }
    default: {
      return state;
    }
  }
};