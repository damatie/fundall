import * as Actions from '../actions';
const initialState = {
  loading: false,
  data: []
}
export const profileReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_EMPLOYEE_PROFILE: {
      return {
        ...state,
        data: actions.payload,
        loading: false
      };
    };
    case Actions.EMPLOYEE_PROFILE_LOADING: {
      return {
        ...state,
        loading: true
      };
    };
    default: {
      return {
        ...state
      }
    }
  };
};