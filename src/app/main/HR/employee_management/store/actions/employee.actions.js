import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { handleResponse } from 'app/auth/handleRes';


export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const SAVE_EMPLOYEE = 'SAVE_EMPLOYEE';
export const EMPLOYEE_LOADING = 'EMPLOYEE_LOADING';
export const EMPLOYEE_ERROR = 'EMPLOYEE_ERROR';
export const EMPLOYEE_DETAILS = 'EMPLOYEE DETAILS';
export const EMPLOYEE_INFO = 'EMPLOYEE INFO';
export const LOADING_EMPLOYEE_INFO = 'LOADING EMPLOYEE INFO';
export const LOADING_EMPLOYEE_DETAILS = 'LOADING EMPLOYEE DETAILS';

const header = fetchHeaders();

export function saveEmployee(data) {
  const body = {
    email: data.email,
    departmentId: data.departmentId,
    roleId: data.role
  }
  return dispatch => {
    dispatch({
      type: EMPLOYEE_LOADING
    });

    fetch(`${getBaseUrl()}/auth/employee/add-employee`, {
      ...header.reqHeader(
        'post',
        body
      )
    }).then(res => res.json()).then(
      result => {
        if(result.success) {
          swal.fire({
            title: 'New employee',
            text: result.message,
            icon: 'success',
            timer: 3000,
          })
          return dispatch({
            type: SAVE_EMPLOYEE,
            // payload: response.data
          });
        } else {
          swal.fire({
            title: 'New employee',
            text: result.message,
            icon: 'info',
            timer: 3000,
          })
          return dispatch({
            type: EMPLOYEE_ERROR,
            payload: 'Error'
          });
        }
      }
    ).catch(e => console.error(e));
  }
};

export const getEmployeeDetails = id => {
  return dispatch => {
    dispatch({
      type: LOADING_EMPLOYEE_DETAILS
    });
    fetch(`${getBaseUrl()}/auth/employee/${id}`, {
      ...header.getRegHeader()
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: EMPLOYEE_DETAILS,
            payload: data.data
          })
        } else {
          dispatch({
            type: EMPLOYEE_DETAILS,
            payload: []
          })
        }
      }
    ).catch(e => console.error(e));
  };
};

export const getEmployeeInfo = data => {
  return dispatch => {
    dispatch({
      type: LOADING_EMPLOYEE_INFO
    })
    dispatch({
      type: EMPLOYEE_INFO,
      payload: data
    })
  };
};

