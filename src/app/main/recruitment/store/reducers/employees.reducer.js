import * as Actions from '../actions';

const initialState = {
  employees: [],
  entities: [],
  departments: [],
  departmentList: [],
  roles: [],
  grades: [],
  gradeLevels: [],
  loading: true,
  jobTitles: [],
}

const employeesReducer = (state = initialState, actions) => {
  switch(actions.type) {
    case Actions.GET_JOBTITLE:
      return {
        ...state,
        jobTitles: actions.payload,
      }
    case Actions.GET_EMPLOYEES:
      return {
        ...state,
        loading: false,
        employees: actions.payload
      }
    case Actions.GET_ENITIES:
      return {
        ...state,
        entities: actions.payload
      }
    case Actions.GET_DEPARTMENTS:
      return {
        ...state,
        departments: actions.payload
      }
    case Actions.GET_ALL_DEPARTMENTS:
      return {
        ...state,
        departmentList: actions.payload
      }
    case Actions.GET_ROLES:
      return {
        ...state,
        roles: actions.payload
      }
    case Actions.EMPLOYEE_GRADES:
      return {
        ...state,
        grades: actions.payload
      }
    case Actions.EMPLOYEE_GRADE_LEVELS:
      return {
        ...state,
        gradeLevels: actions.payload
      }
    default:
      return state;
  }
};

export default employeesReducer;