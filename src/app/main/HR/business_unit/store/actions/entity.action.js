import axios from 'axios';
import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { handleResponse } from 'app/auth/handleRes';


export const GET_ENTITY = 'GET ENTITY';
export const CREATE_ENTITY = 'CREATE ENTITY';
export const ENTITY_LOADING = 'ENTITY LOADING';
export const ENTITY_ERROR = 'ENTITY ERROR';
export const UPDATE_ENTITY = 'UPDATE ENTITY';

const headers = fetchHeaders();

export function createEntity(data) {
  return dispatch => {
    dispatch({
      type: ENTITY_LOADING
    });

    const request = axios.post(`${getBaseUrl()}/entity/new`, data, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		request.then(response => {
      if(response.data.success && response.data.message === 'Entity created successfully') {
        swal.fire({
          title: 'Entity',
          text: response.data.message,
          icon: 'success',
          timer: 3000,
        })
        return dispatch({
          type: CREATE_ENTITY,
        });
      } else {
        swal.fire({
          title: 'Entity',
          text: response.data.message,
          icon: 'info',
          timer: 3000,
        })
        return dispatch({
          type: ENTITY_ERROR,
          payload: 'Error'
        });
      }
    }).catch(e => {
      swal.fire({
        title: 'Entity',
        text: 'Failed to create Entity',
        icon: 'error',
        timer: 3000,
      })
      return dispatch({
        type: ENTITY_ERROR,
        payload: 'Error'
      });
    })
  }
};

export const getOneEntity = id => {
  return dispatch => {
    dispatch({
      type: ENTITY_LOADING
    });

    const request = axios.get(`${getBaseUrl()}/entity/one/${id}`, {
      headers: {
        Authorization: `JWT ${useAuth().getToken}`
      }
    });
		request.then(response => {
      if(response.data.success) {
        return dispatch({
          type: GET_ENTITY,
          payload: response.data.data
        });
      }
    }).catch(e => {
      swal.fire({
        title: 'Entity',
        text: 'Failed to get Entity',
        icon: 'error',
        timer: 3000,
      })
      return dispatch({
        type: ENTITY_ERROR,
        payload: 'Error'
      });
    })
  }
};

export const updateEntity = (id, body) => {
  return dispatch => {
    dispatch({
      type: ENTITY_LOADING
    });
    fetch(`${getBaseUrl()}/entity/update/${id}`, {
      ...headers.reqHeader(
        'PATCH',
        body
      )
    }).then(res => handleResponse(res)).then(
      data => {
        dispatch({
          type: UPDATE_ENTITY
        });
        swal.fire({
          title: 'UPDATE ENTITY',
          text: data.message,
          icon: 'success',
          timer: 2500
        });
      }
    ).catch(e => console.error(e));
  }
};