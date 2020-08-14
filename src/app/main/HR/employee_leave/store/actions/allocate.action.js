import swal from 'sweetalert2';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';

export const ALLOCATE_LEAVE = 'ALLOCATE LEAVE';
export const ALLOCATING = 'ALLOCATING';
export const ALLOCATE_LEAVE_SUCCESS = 'ALLOCATE_LEAVE_SUCCESS';
export const ALLOCATE_LEAVE_ERROR = 'ALLOCATE LEAVE ERROR';

const auth = useAuth;
export const allocateLeave = data => {
  return dispatch => {
    dispatch({
      type: ALLOCATING
    })
    fetch(`${getBaseUrl()}/allot-leave/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${auth().getToken}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(result => {
      if(result.success) {
        swal.fire({
          title: 'Allocate leave',
          text: result.message,
          icon: 'success',
          timer: 3000,
        })
        dispatch({
          type: ALLOCATE_LEAVE
        })
        dispatch({
          type: ALLOCATE_LEAVE_SUCCESS
        })
      } else {
        swal.fire({
          title: 'Allocate leave',
          text: result.message,
          icon: 'error',
          timer: 3000,
        })
        dispatch({
          type: ALLOCATE_LEAVE
        })
        dispatch({
          type: ALLOCATE_LEAVE_ERROR
        })
      }
    }).catch(e => {
      console.e(e);
    })
   
  }
};