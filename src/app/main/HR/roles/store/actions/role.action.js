import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';

export const CREATE_ROLE_SUCCESS = 'CREATE ROLE_SUCCESS';
export const CREATE_ROLE_ERROR = 'CREATE ROLE_ERROR';
export const LOADING_ROLE = 'LOADING ROLE';

export const createRole = data => {
  const auth = useAuth;
  return dispatch => {
    dispatch({
      type: LOADING_ROLE
    })
    fetch('https://hris-cbit.herokuapp.com/api/v1/roles', {
      method: 'post',
      headers: {
        Authorization: `JWT ${auth().getToken}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
      if(data.success) {
        swal.fire({
          title: 'Create Role',
          text: data.message,
          timer: 3000,
          icon: 'success'
        })
        dispatch({
          type: CREATE_ROLE_SUCCESS
        })
      } else {
        swal.fire({
          title: 'Create Role',
          text: data.message,
          timer: 3000,
          icon: 'danger'
        })
        dispatch({
          type: CREATE_ROLE_ERROR
        })
      }
    }).catch(e => {
      console.error(e);
      dispatch({
        type: CREATE_ROLE_ERROR
      })
    })
  }
};

