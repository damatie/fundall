import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders';

const headers = fetchHeaders();

export const CREATE_RESOURCE_SUCCESS = 'CREATE RESOURCE_SUCCESS';
export const CREATE_RESOURCE_ERROR = 'CREATE RESOURCE_ERROR';
export const LOADING_RESOURCE = 'LOADING RESOURCE';
export const GET_ONE_RESOURCES = 'GET ONE RESOURCES';

export const createResourse = data => {
  const auth = useAuth;
  return dispatch => {
    dispatch({
      type: LOADING_RESOURCE
    })
    fetch('https://hris-cbit.herokuapp.com/api/v1/resources', {
      method: 'post',
      headers: {
        Authorization: `JWT ${auth().getToken}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
      // console.log(data)
      if(data.success) {
        swal.fire({
          title: 'Create Resourse',
          text: data.message,
          timer: 3000,
          icon: 'success'
        })
        dispatch({
          type: CREATE_RESOURCE_SUCCESS
        })
      } else {
        swal.fire({
          title: 'Create Resourse',
          text: data.message,
          timer: 3000,
          icon: 'error'
        })
        dispatch({
          type: CREATE_RESOURCE_ERROR
        })
      }
    }).catch(e => {
      console.error(e);
      dispatch({
        type: CREATE_RESOURCE_ERROR
      })
    })
  }
};

export const updateResourse = (data, id) => {
  const auth = useAuth;
  return dispatch => {
    dispatch({
      type: LOADING_RESOURCE
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/resources/${id}`, {
      method: 'post',
      headers: {
        Authorization: `JWT ${auth().getToken}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
      // console.log(data)
      if(data.success) {
        swal.fire({
          title: 'Update Resourse',
          text: data.message,
          timer: 3000,
          icon: 'success'
        })
        dispatch({
          type: CREATE_RESOURCE_SUCCESS
        })
      } else {
        swal.fire({
          title: 'Update Resourse',
          text: data.message,
          timer: 3000,
          icon: 'error'
        })
        dispatch({
          type: CREATE_RESOURCE_ERROR
        })
      }
    }).catch(e => {
      console.error(e);
      dispatch({
        type: CREATE_RESOURCE_ERROR
      })
    })
  }
};

export const getOneResources = (id) => {
  return dispatch => {
    dispatch({
      type: LOADING_RESOURCE
    })

    fetch(`https://hris-cbit.herokuapp.com/api/v1/resources/${id}`, {
      ...headers.getRegHeader()
    }
    ).then(res => res.json()).then(
      data => {
        data.success ? 
          dispatch({
            type: GET_ONE_RESOURCES,
            payload: data.data
          })
          
          :
          dispatch({
            type: GET_ONE_RESOURCES,
            payload: {

            }
          })
      }
    ).catch(e => console.error(e));
  }
} 

