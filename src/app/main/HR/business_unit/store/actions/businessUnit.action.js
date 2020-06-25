import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';


export const GET_BUSINESS_UNIT = 'GET_BUSINESS_UNIT';
export const SAVE_BUSINESS_UNIT = 'SAVE_BUSINESS_UNIT';
export const BUSINESS_UNIT_LOADING = 'BUSINESS_UNIT_LOADING';
export const BUSINESS_UNIT_ERROR = 'BUSINESS_UNIT_ERROR';

export function saveBusinessUnit(data) {
  return dispatch => {
    dispatch({
      type: BUSINESS_UNIT_LOADING
    });

    const request = axios.post('https://hris-cbit.herokuapp.com/api/v1/entity/new', data, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		request.then(response => {
      if(response.data.success && response.data.message === 'Entity created successfully') {
        swal.fire({
          title: 'Business unit',
          text: response.data.message,
          icon: 'success',
          timer: 3000,
        })
        return dispatch({
          type: SAVE_BUSINESS_UNIT,
          // payload: response.data
        });
      } else {
        swal.fire({
          title: 'Business unit',
          text: response.data.message,
          icon: 'info',
          timer: 3000,
        })
        return dispatch({
          type: BUSINESS_UNIT_ERROR,
          payload: 'Error'
        });
      }
    }).catch(e => {
      swal.fire({
        title: 'Business unit',
        text: 'Failed to create business unit',
        icon: 'error',
        timer: 3000,
      })
      return dispatch({
        type: BUSINESS_UNIT_ERROR,
        payload: 'Error'
      });
    })
  }
}

export const getOneBusinessUnit = id => {
  return dispatch => {
    dispatch({
      type: BUSINESS_UNIT_LOADING
    });

    const request = axios.get(`https://hris-cbit.herokuapp.com/api/v1/entity/one/${id}`, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		request.then(response => {
      if(response.data.success) {
        return dispatch({
          type: GET_BUSINESS_UNIT,
          payload: response.data.data
        });
      }
    }).catch(e => {
      swal.fire({
        title: 'Business unit',
        text: 'Failed to get business unit',
        icon: 'error',
        timer: 3000,
      })
      return dispatch({
        type: BUSINESS_UNIT_ERROR,
        payload: 'Error'
      });
    })
  }
}