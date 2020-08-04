import { getBaseUrl } from "app/shared/getBaseUrl";
import { fetchHeaders } from "app/shared/fetchHeaders";
import { handleResponse } from "app/auth/handleRes";
import swal from 'sweetalert2';


export const  GET_EMPLOYEE_INFO = 'GET EMPLOYEE INFO';
export const LOADING_EMPLOYEE_INFO = 'LOADING EMPLOYEE INFO';
export const UPDATE_EMPLOYEE_INFO = 'UPDATE EMPLPOYEE INFO';
export const UPDATING_EMPLOYEE_INFO = 'UPDATING EMPLOYEE INFO';
export const CREATE_EMPLOYEE_INFO = 'CREATE EMPLOYEE INFO';
export const CREATING_EMPLOYEE_INFO = 'CREATING EMPLOYEE INFO';

const header = fetchHeaders();

export const getEmployeeInfo = id => {
  return dispatch => {
    fetch(`${getBaseUrl()}/info`, {
      ...header.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        dispatch({
          type: GET_EMPLOYEE_INFO,
          payload: data.infoData
        });
      }
    ).catch(e => console.error(e));
  }
};

export const updateEmployeeInfo = (id, body) => {
  return dispatch => {
    dispatch({
      type: UPDATING_EMPLOYEE_INFO
    })
    fetch(`${getBaseUrl()}/info`, {
      ...header.formDHeader(
        'PATCH',
        body
      )
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: UPDATE_EMPLOYEE_INFO,
          });
          swal.fire({
            title: 'Employee Info',
            text: data.message,
            icon: 'success',
            timer: 3000
          });
        } else {
          swal.fire({
            title: 'Employee Info',
            text: data.error,
            icon: 'error',
            timer: 3000
          });
        }
        
      }
    )
  }
};

export const createEmployeeInfo = (id, body) => {
  return dispatch => {
    dispatch({
      type: CREATING_EMPLOYEE_INFO
    })
    fetch(``, {
      ...header.formDHeader(
        'POST',
        body
      )
    }).then(res => handleResponse(res)).then(
      data => {
        dispatch({
          type: CREATE_EMPLOYEE_INFO,
        });
        swal.fire({
          title: 'Create employee Info',
          text: data.message,
          icon: 'success',
          timer: 3000
        });
      }
    )
  }
};

