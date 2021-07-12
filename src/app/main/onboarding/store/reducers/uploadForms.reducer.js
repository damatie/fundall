import { GET_NHF, GET_MALARIA_PPA } from '../actions'

const initialState = {
  nhf: {
    loading: true,
    data: { },
  },
  malaria: {
    loading: true,
    data: { },
  }
}

const uploadFormsReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case GET_NHF:
      return {
        ...state,
        nhf: {
          loading: false,
          data: actions.payload,
        },
      }
    case GET_MALARIA_PPA:
      return {
        ...state,
        malaria: {
          loading: false,
          data: actions.payload,
        },
      }
    default:
      return state;
  }
};

export default uploadFormsReducer;