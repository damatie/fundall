import { fetchHeaders } from "app/shared/fetchHeaders";


export const GET_DEPARTMENT_EMPLOYEES = 'GET DEPARTMENT EMPLOYEES';
export const EMPLOYEE_LOADING = 'EMPLOYEE LOADNING';
export const GET_DEPARTMENT_EMPLOYEES_ERROR = 'GET DEPARTMENT EMPLOYEE ERROR';
export const GET_DEPARTMENT_EMPLOYEE_SUCCESS = 'GET DEPARTMENT EMPLOYEE SUCCESS';
export const RESET_DEPARTMENT_EMPLOYEE_LIST = 'RESET DEPARTMENT EMPLOYEE LIST';
export const UPDATE_DEPARTMENT_EMPLOYEE_LIST = 'UPDATE DEPARTMENT EMPLOYEE LIST';

const header = fetchHeaders()

export const getDepartmentEmployees = id => {
  return dispatch => {
    dispatch({
      type: EMPLOYEE_LOADING
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/auth/employee/department/${id}`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        console.log(data)
        if(data.success) {
          dispatch({
            type: GET_DEPARTMENT_EMPLOYEE_SUCCESS
          });
          dispatch({
            type: GET_DEPARTMENT_EMPLOYEES,
            payload: data.data
          });
        } else {
          dispatch({
            type: GET_DEPARTMENT_EMPLOYEES_ERROR
          })
        }
      }
    ).catch(e => console.error(e))
  }
}