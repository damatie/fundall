import { OPEN_EMPLOYEE_SURVEY_MODAL } from "../actions";

const initialState = {
  open: false,
};

const employeeSurveyReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case OPEN_EMPLOYEE_SURVEY_MODAL:
      return {
        ...state,
        open: true,
      }
    default: {
      return state
    }
  }
}

export default employeeSurveyReducer;