import { GET_COUNTRIES, GET_STATES, GET_CITIES } from '../actions';

const initialState = {
  countries: [],
  states: [],
  cities: [],
}

const locationsReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: actions.payload
      }
    case GET_STATES:
      return {
        ...state,
        states: actions.payload
      }
    case GET_CITIES:
      return {
        ...state,
        cities: actions.payload,
      }
    default:
      return state
  }
};

export default locationsReducer;