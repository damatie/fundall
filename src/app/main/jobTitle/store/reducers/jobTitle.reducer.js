import { OPEN_JOB_TITLE_MODAL, CLOSE_JOB_TITLE_MODAL, GET_ALL_JOB_TITLE, GET_ONE_JOB_TITLE } from '../actions';
const initialState = {
  open: false,
  loading: true,
  data: [],
  singleData: {},
  type: 'new'
}

const jobTitleReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_JOB_TITLE_MODAL:
      return {
        ...state,
        open: true,
        type: actions.payload
      }
    case CLOSE_JOB_TITLE_MODAL:
      return {
        ...state,
        open: false,
        type: actions.payload
      }
    case GET_ALL_JOB_TITLE:
      return {
        ...state,
        data: actions.payload,
        loading: false
      }
    case GET_ONE_JOB_TITLE:
      return {
        ...state,
        singleData: actions.payload
      }
    default: {
      return state
    }
  }
};

export default jobTitleReducer;