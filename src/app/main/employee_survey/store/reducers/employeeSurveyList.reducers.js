import { OPEN_EMPLOYEE_SURVEY_FORM_MODAL, CLOSE_EMPLOYEE_SURVEY_FORM_MODAL, GET_ALL_EMPLOYEE_SURVEY_LIST_ITEM, GET_ONE_EMPLOYEE_SURVEY_LIST_ITEM } from '../actions';

const initialState = {
  open: false,
  employeeSurveyList: [],
  loading: true,
  employeeSurvey: {},
  loadingSingleEmployeeSurvey: true,
};

const employeeSurveyListReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_EMPLOYEE_SURVEY_FORM_MODAL:
      return {
        ...state,
        open: true,
      }
    case CLOSE_EMPLOYEE_SURVEY_FORM_MODAL:
      return {
        ...state,
        open: false
      }
    case GET_ALL_EMPLOYEE_SURVEY_LIST_ITEM:
      return {
        ...state,
        employeeSurveyList: actions.payload,
        loading: false
      }
    case GET_ONE_EMPLOYEE_SURVEY_LIST_ITEM:
      return {
        ...state,
        employeeSurvey: actions.payload,
        loadingSingleEmployeeSurvey: false
      }
    default: {
      return state
    }
  }
}

export default employeeSurveyListReducer;