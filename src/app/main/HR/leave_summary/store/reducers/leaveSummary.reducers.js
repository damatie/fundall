import * as Actions from '../actions';

export const leaveSummaryReducers = (state = {}, actions) => {
  switch(actions) {

    case Actions.GET_ONE_LEAVE_SUMMARY: {
      return state = actions.payload
    };

    default: {
      return state;
    };

  }
};