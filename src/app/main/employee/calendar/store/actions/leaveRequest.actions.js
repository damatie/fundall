import { fetchHeaders } from "app/shared/fetchHeaders";
import swal from 'sweetalert2';
import { getBaseUrl } from "app/shared/getBaseUrl";
import { handleResponse } from "app/auth/handleRes";

export const LOADING_REQUEST = 'LOADING REQUEST';
export const REQUEST_LEAVE_SUCCESS = 'REQUEST LEAVE REQUEST';
export const REQUEST_LEAVE_ERROR = 'REQUEST LEAVE ERROR';
export const UPDATE_LEAVE_REQUEST = 'UPDATE LEAVE REQUEST';

const header = fetchHeaders();
export const requestLeave = result => {
  return dispatch => {
    dispatch({
      type: LOADING_REQUEST
    })
    fetch(`${getBaseUrl()}/employee-leave/`, {
      ...header.reqHeader(
        'post',
        result
      )
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          swal.fire({
            title: 'Leave Request',
            text: 'Leave requested successfully',
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: REQUEST_LEAVE_SUCCESS
          })
        } else {
          swal.fire({
            title: 'Leave Request',
            text: data.message,
            icon: 'error',
            timer: 3000
          })
          dispatch({
            type: REQUEST_LEAVE_ERROR
          })
        }
      }
    ).catch(e => console.error(e))
  }
}

export const updateLeave = result => {
  return dispatch => {
    dispatch({
      type: LOADING_REQUEST
    });
    fetch(`${getBaseUrl()}/employee-leave/${result.id}`, {
      ...header.reqHeader(
        'PATCH',
        result.body
      )
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: UPDATE_LEAVE_REQUEST
          });
          swal.fire({
            title: 'UPDATE LEAVE REQUEST',
            text: 'you have successfuly update your leave request',
            icon: 'success',
            timer: 2500
          });
        } else {
          swal.fire({
            tile: 'UPDATE LEAVE REQUEST',
            text: data.message,
            icon: 'error',
            timer: 2500
          });
        }
      }
    ).catch(e => console.error(e));
  }
}