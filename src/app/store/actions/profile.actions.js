import { fetchHeaders } from "app/shared/fetchHeaders";
import { handleResponse } from "app/auth/handleRes";
import swal from 'sweetalert2';
import { getBaseUrl } from "app/shared/getBaseUrl";

export const GET_EMPLOYEE_PROFILE = 'GET EMPLOYEE PROFILE';
export const LOADING_EMPLOYEE_PROFILE = 'LOADING EMPLOYEE PROFILE';
export const UPDATE_EMPLOYEE_PROFILE = 'UPDATE EMPLOYEE PROFILE';
export const UPDATING_EMPLOYEE_PROFILE = 'UPDATING EMPLOYEE PROFILE';
export const UPLOADING_IMAGE = 'UPLOADING IMAGE';
export const UPLOAD_IMAGE = 'UPLOAD IMAGE';
export const ERROR = 'ERROR';

const headers = fetchHeaders();
export const getEmployeeProfile = id => {
  return dispatch => {
    dispatch({
      type: LOADING_EMPLOYEE_PROFILE
    });
    fetch(`${getBaseUrl()}/auth/employee/${id}`, {
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

export const updateEmployeeProfile = (id, body) => {
  return dispatch => {
    dispatch({
      type: UPDATING_EMPLOYEE_PROFILE
    });
    fetch(`${getBaseUrl()}/auth/employee/`,{
      ...headers.reqHeader(
        'PATCH',
        body
      )
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: UPDATE_EMPLOYEE_PROFILE
          });
          swal.fire({
            title: 'Update profile',
            text: data.message,
            timer: 2000,
            icon: 'success'
          });
          dispatch(getEmployeeProfile(id));
        } else {
          dispatch({
            type: ERROR,
          });
          swal.fire({
            title: 'Update profile',
            text: data.message,
            timer: 2000,
            icon: 'error'
          });
        }
      }
    )
  }
};

export const uploadImage = (id, body) => {
  return dispatch => {
    dispatch({
      type: UPLOADING_IMAGE
    })
    swal.showLoading()
    fetch(`${getBaseUrl()}/auth/employee/profile-picture`, {
      ...headers.formDHeader(
        'PATCH',
        body
      )
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: UPLOAD_IMAGE,
          });
          swal.fire({
            title: 'Profile picture',
            text: data.message,
            icon: 'success',
            timer: 2000
          })
          dispatch(getEmployeeProfile(id));
        } else {
          dispatch({
            type: ERROR,
          });
          swal.fire({
            title: 'Profile picture',
            text: data.message,
            icon: 'error',
            timer: 2000
          })
        }
      }
    )
  }
}

