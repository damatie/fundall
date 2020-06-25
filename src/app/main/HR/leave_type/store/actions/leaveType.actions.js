import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';


export const GET_LEAVE_TYPE = 'GET_LEAVE_TYPE';
export const SAVE_LEAVE_TYPE = 'SAVE_LEAVE_TYPE';
export const LEAVE_TYPE_LOADING = 'LEAVE_TYPE_LOADING';
export const LEAVE_TYPE_ERROR = 'LEAVE_TYPE_ERROR';

export function saveLeaveTypes(data) {
  return dispatch => {
    dispatch({
      type: LEAVE_TYPE_LOADING
    });

    const request = axios.post('https://hris-cbit.herokuapp.com/api/v1/leave-type/', data, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		request.then(response => {
      console.log(response)
      // if(response.data.success /*&& response.data.message === ' created successfully'*/) {
        swal.fire({
          title: 'New leave type',
          text: response.data.message,
          icon: 'success',
          timer: 3000,
        })
        return dispatch({
          type: SAVE_LEAVE_TYPE,
          // payload: response.data
        });
     
    }).catch(e => {
      console.log(e);
      swal.fire({
        title: 'New leave type',
        text: 'leave type already exist',
        icon: 'error',
        timer: 3000,
      })
      return dispatch({
        type: LEAVE_TYPE_ERROR,
        payload: 'Error'
      });
    })
  }
}