import swal from 'sweetalert2';

export const GET_LEAVE_DAYS = 'GET LEAVE DAYS';
export const LEAVE_DAYS_LOADING = 'LEAVE DAYS LOADING';
export const LEAVE_DAYS_ERROR = 'LEAVE DAYS ERROR';
export const LEAVE_DAYS_SUCCESS = 'LEAVE DAYS SUCCESS';

export const getLeaveDays = id => {
  return dispatch => {
    dispatch({
      type: LEAVE_DAYS_LOADING
    });
    fetch('').then(res => res.json()).then(data => {
      if(data.success) {
        dispatch({
          type: GET_LEAVE_DAYS
        });
        dispatch({
          type: LEAVE_DAYS_SUCCESS
        });
      } else {
        dispatch({
          type: LEAVE_DAYS_ERROR
        });
      }
    })
  }
}