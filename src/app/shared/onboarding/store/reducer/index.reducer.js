import * as Actions from '../actions';

const initialState = {
  id: 1,
  title: 'Acknowledegement of harassment-free workplace policy'
};

export const indexTabReducer = (state = initialState , actions ) => {
  switch(actions.type) {
    case Actions.SET_INDEX : {
      return {
        ...state,
        ...actions.payload
      }
    }
    case Actions.GET_INDEX: {
      return state;
    }
    default: {
      return state
    }
  };
};