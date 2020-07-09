import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders';


export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const SAVE_EMPLOYEE = 'SAVE_EMPLOYEE';
export const EMPLOYEE_LOADING = 'EMPLOYEE_LOADING';
export const EMPLOYEE_ERROR = 'EMPLOYEE_ERROR';

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

    fetch('https://hris-cbit.herokuapp.com/api/v1/auth/employee/add-employee', {
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
}