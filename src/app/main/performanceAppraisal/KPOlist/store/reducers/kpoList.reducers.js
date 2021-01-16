import { CLOSE_EMPLOYEE_KPO_LIST_MODAL, OPEN_EMPLOYEE_KPO_LIST_MODAL, GET_ONE_KPO, GET_ALL_KPO, CLEAR_KPO_DATA, GET_JOBTITLE } from '../actions';

const initialState = {
  open: false,
  kpoList: [],
  loading: true,
  kpo: {},
  loadingSingleKpo: true,
  jobTitles: [],
};

const kpoListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_EMPLOYEE_KPO_LIST_MODAL:
      return {
        ...state,
        open: true,
      }
    case GET_JOBTITLE:
      return {
        ...state,
        jobTitles: actions.payload
      }
    case CLOSE_EMPLOYEE_KPO_LIST_MODAL:
      return {
        ...state,
        open: false
      }
    case GET_ALL_KPO:
      return {
        ...state,
        kpoList: actions.payload,
        loading: false
      }
    case GET_ONE_KPO:
      return {
        ...state,
        kpo: actions.payload,
        loadingSingleKpo: false
      }
    case CLEAR_KPO_DATA:
      return {
        ...state,
        kpo: {}
      }
    default: {
      return state
    }
  }
}

export default kpoListReducer;