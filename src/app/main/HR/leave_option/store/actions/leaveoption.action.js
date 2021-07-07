import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';


export const GET_LEAVE_OPTIONS = 'GET_LEAVE_OPTIONS';
export const SAVE_LEAVE_OPTIONS = 'SAVE_LEAVE_OPTIONS';
export const LEAVE_OPTIONS_LOADING = 'LEAVE_OPTIONS_LOADING';
export const LEAVE_OPTIONS_ERROR = 'LEAVE_OPTIONS_ERROR';

export function saveLeaveOptions(data) {
  return dispatch => {
    dispatch({
      type: LEAVE_OPTIONS_LOADING
    });

    const request = axios.post('https://hris-cbit.herokuapp.com/api/v1//leave/manage', data, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		request.then(response => {
      // // console.log(response)
      // if(response.data.success /*&& response.data.message === ' created successfully'*/) {
        swal.fire({
          title: 'New leave type',
          text: response.data.message,
          icon: 'success',
          timer: 3000,
        })
        return dispatch({
          type: SAVE_LEAVE_OPTIONS,
          // payload: response.data
        });
      // } else {
      //   swal.fire({
      //     title: 'New leave type',
      //     text: response.data.message,
      //     icon: 'info',
      //     timer: 3000,
      //   })
      //   return dispatch({
      //     type: LEAVE_OPTIONS_ERROR,
      //     payload: 'Error'
      //   });
      // }
    }).catch(e => {
      console.log(e);
      swal.fire({
        title: 'New leave type',
        text: 'Can not create leave options',
        icon: 'error',
        timer: 3000,
      })
      return dispatch({
        type: LEAVE_OPTIONS_ERROR,
        payload: 'Error'
      });
    })
  }
}