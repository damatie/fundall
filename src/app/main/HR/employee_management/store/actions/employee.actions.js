import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';


export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const SAVE_EMPLOYEE = 'SAVE_EMPLOYEE';
export const EMPLOYEE_LOADING = 'EMPLOYEE_LOADING';
export const EMPLOYEE_ERROR = 'EMPLOYEE_ERROR';

export function saveEmployee(data) {
  return dispatch => {
    dispatch({
      type: EMPLOYEE_LOADING
    });

    const request = axios.post('https://hris-cbit.herokuapp.com/api/v1/auth/employee/signup', data, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		request.then(response => {
      if(response.data.success && response.data.message === 'employee created successfully') {
        swal.fire({
          title: 'New employee',
          text: response.data.message,
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
          text: response.data.message,
          icon: 'info',
          timer: 3000,
        })
        return dispatch({
          type: EMPLOYEE_ERROR,
          payload: 'Error'
        });
      }
    }).catch(e => {
      swal.fire({
        title: 'New employee',
        text: 'Employee already exist',
        icon: 'error',
        timer: 3000,
      })
      return dispatch({
        type: EMPLOYEE_ERROR,
        payload: 'Error'
      });
    })
  }
}