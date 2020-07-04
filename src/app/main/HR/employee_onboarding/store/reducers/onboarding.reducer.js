import * as Actions from '../actions';

const initialState = {
  loading: false,
  data: []
};

export const onboardingReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_ONBOARDINGS : {
      return {
        ...state,
        loading: false,
        data: actions.payload
      };
    };
    case Actions.ONBOARDINGS_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}