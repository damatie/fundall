import * as Actions from '../actions';

const initialState = {
  countries: [],
  states: [],
  cities: [],
};

export const regionsReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_COUNTRIES: {
      return {
        ...state,
        countries: actions.payload
      }
    }
    case Actions.GET_STATES: {
      return {
        ...state,
        states: actions.payload,
      }
    }
    case Actions.GET_CITIES: {
      return {
        ...state,
        cities: actions.payload
      }
    }
    default: {
      return state;
    }
  }
};