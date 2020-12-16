import { OPEN_EMPLPYEE_GRADE_MODAL, CLOSE_EMPLOYEE_GRADE_MODAL, GET_ALL_EMPLOYEE_GRADE, GET_ONE_EMPLOYEE_GRADE } from '../actions';

const initialState = {
  open: false,
  data: [],
  signleData: [],
  loading: true,
  type: 'new'
}

const employeeGradeReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_EMPLPYEE_GRADE_MODAL:
      return {
        ...state,
        open: true,
        type: actions.payload
      }
    case CLOSE_EMPLOYEE_GRADE_MODAL:
      return {
        ...state,
        open: false,
        type: actions.payload
      }
    case GET_ALL_EMPLOYEE_GRADE:
      return {
        ...state,
        data: actions.payload,
        loading: false
      }
    case GET_ONE_EMPLOYEE_GRADE:
      return {
        ...state,
        singleData: actions.payload
      }
    default: {
      return state;
    }
  }
};

export default employeeGradeReducer;