import { fetchHeaders } from "app/shared/fetchHeaders";
import swal from 'sweetalert2';

export const LOADING_REQUEST = 'LOADING REQUEST';
export const REQUEST_LEAVE_SUCCESS = 'REQUEST LEAVE REQUEST';
export const REQUEST_LEAVE_ERROR = 'REQUEST LEAVE ERROR';

const header = fetchHeaders();
export const requestLeave = result => {
  return dispatch => {
    dispatch({
      type: LOADING_REQUEST
    })
    fetch('https://hris-cbit.herokuapp.com/api/v1/employee-leave/', {
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