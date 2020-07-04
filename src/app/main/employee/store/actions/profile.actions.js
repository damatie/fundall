import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';

export const GET_EMPLOYEE_PROFILE = 'GET_EMPLOYEE_PROFILE';
export const UPDATE_EMPLOYEE_PROFILE = 'UPDATE_EMPLOYEE_PROFILE';
export const EMPLOYEE_PROFILE_LOADING = 'EMPLOYEE_PROFILE_LOADING';

export const getEmployeeProfile = (id) => {
  
  return dispatch => {
    dispatch({
      type: EMPLOYEE_PROFILE_LOADING
    });
    const request = axios.get(`https://hris-cbit.herokuapp.com/api/v1/auth/employee/${id ? id : useAuth().getId}`, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    })
    request.then(res => {
      if(res.data.success) {
        return dispatch({
          type: GET_EMPLOYEE_PROFILE,
          payload: res.data.data
        })
      }
    })
  }

};

export const updateEmployeeProfile = (data) => {
  return dispatch => {
    dispatch({
      type: UPDATE_EMPLOYEE_PROFILE
    });
    const request = axios.patch('', data, {
      header: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    })
    request.then(res => {
      if(res.data.success) {
        swal.fire({
          tile: 'Profile update',
          text: data.success,
          icon: 'success',
          timer: 3000
        })
        getEmployeeProfile();
      }
    })
  }
  
}