import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders';


export const GET_LEAVE_TYPE = 'GET_LEAVE_TYPE';
export const SAVE_LEAVE_TYPE = 'SAVE_LEAVE_TYPE';
export const LEAVE_TYPE_LOADING = 'LEAVE_TYPE_LOADING';
export const LEAVE_TYPE_ERROR = 'LEAVE_TYPE_ERROR';

const header = fetchHeaders();

export function saveLeaveTypes(data) {
  return dispatch => {
    dispatch({
      type: LEAVE_TYPE_LOADING
    });

    fetch('https://hris-cbit.herokuapp.com/api/v1/leave-type/', {
      ...header.reqHeader(
        'post', 
        data
      )
    }).then(res => res.json()).then(data => {
      if(data.success) { 
        dispatch({
          type: LEAVE_TYPE_ERROR,
          payload: 'Error'
        }) 
        swal.fire({
          title: 'New leave type',
          text: data.message,
          icon: 'success',
          timer: 3000,
        }) 
      } else {
        swal.fire({
          title: 'New leave type',
          text: data.message,
          icon: 'error',
          timer: 3000,
        })
        return dispatch({
          type: LEAVE_TYPE_ERROR,
          payload: 'Error'
        });
      }
    }).catch(e => {
      console.error(e);
    })

  
  }
}