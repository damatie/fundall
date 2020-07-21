import { fetchHeaders } from "app/shared/fetchHeaders";

export const GET_EMPLOYEE_PROFILE = 'GET EMPLOYEE PROFILE';
export const LOADING_EMPLOYEE_PROFILE = 'LOADING EMPLOYEE PROFILE';

const headers = fetchHeaders();
export const getEmployeeProfile = id => {
  return dispatch => {
    dispatch({
      type: LOADING_EMPLOYEE_PROFILE
    });
    fetch(`https://hris-cbit.herokuapp.com/api/v1/auth/employee/${id}`, {
      ...headers.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_EMPLOYEE_PROFILE,
            payload: data.data
          })
        }
      }
    ).catch(e => console.error(e));
  }
};

