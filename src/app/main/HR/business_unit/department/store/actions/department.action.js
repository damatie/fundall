import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders';


export const GET_DEPARTMENT = 'GET_DEPARTMENT';
export const SAVE_DEPARTMENT = 'SAVE_DEPARTMENT';
export const DEPARTMENT_LOADING = 'DEPARTMENT_LOADING';
export const DEPARTMENT_ERROR = 'DEPARTMENT_ERROR';

export function saveDepartment(data, id) {
  return dispatch => {
    dispatch({
      type: DEPARTMENT_LOADING
    });
    const newData = {
      ...data,
      entityId: id
    }

    const request = axios.post('https://hris-cbit.herokuapp.com/api/v1/department/new', newData, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		request.then(response => {
      // if(response.data.success) {
        swal.fire({
          title: 'New department',
          text: response.data.message,
          icon: 'success',
          timer: 3000,
        })
        return dispatch({
          type: SAVE_DEPARTMENT,
          payload: response.data.data
        });
      // } else {
      //   swal.fire({
      //     title: 'New employee',
      //     text: response.data.message,
      //     icon: 'info',
      //     timer: 3000,
      //   })
      //   return dispatch({
      //     type: DEPARTMENT_ERROR,
      //     payload: 'Error'
      //   });
      // }
    }).catch(e => {
      swal.fire({
        title: 'New department',
        text: 'cant not create department',
        icon: 'error',
        timer: 3000,
      })
      return dispatch({
        type: DEPARTMENT_ERROR,
        payload: 'Error'
      });
    })
  }
}

const header = fetchHeaders();

export const getOneDepartment = id => {
  return dispatch => {
    dispatch({
      type: DEPARTMENT_LOADING
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/department/one/${id}`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        dispatch({
          type: GET_DEPARTMENT,
          payload: data.data
        })
      }
    ).catch(e => console.error(e));
  }
}