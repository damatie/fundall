import { fetchHeaders } from "app/shared/fetchHeaders";
import Swal from 'sweetalert2';
import { getBaseUrl } from "app/shared/getBaseUrl";
import { handleResponse } from "app/auth/handleRes";

export const SALARY_REQUEST = 'SALARY REQUEST';
export const LOADING_SALARY_REQUEST = 'LOADING SALARY REQUEST';
export const SALARY_REQUEST_ERROR = 'SALARY REQUEST ERROR';
export const UPDATE_SALARY_REQUEST = 'UPDATE SALARY REQUEST';
export const CANCEL_SALARY_REQUEST = 'CANCEL SALARY REQUEST';
export const SALARY_ADVANCE_REQUEST_ERROR = 'SALARY ADVANCE REQUEST ERROR';

const headers = fetchHeaders();
export const applySalaryAdvance = body => {
  return dispatch => {
    dispatch({
      type: LOADING_SALARY_REQUEST
    })
    fetch(`${getBaseUrl()}/salary-advance`, {
      ...headers.reqHeader(
        'POST',
        body
      )
    }).then(res => res.json()).then(
      data => {
        if(data.message === 'Created!') {
          Swal.fire({
            title: 'Salary advance request',
            text: data.message,
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: SALARY_REQUEST
          })
        } else {
          if(data.error) {
            Swal.fire({
              title: 'Salary advance request',
              text: data.error,
              icon: 'error',
              timer: 3000
            })
            dispatch({
              type: SALARY_REQUEST_ERROR
            })
          } else {
            Swal.fire({
              title: 'Salary advance request',
              text: data.message,
              icon: 'error',
              timer: 3000
            })
            dispatch({
              type: SALARY_REQUEST_ERROR
            })
          }
        }
        
      }
    ).catch(e => console.error(e));
  }
};

export const updateSalaryAdvance = (id, body) => {
  return dispatch => {
    dispatch({
      type: LOADING_SALARY_REQUEST
    });
    fetch(`${getBaseUrl()}/salary-advance/${id}`, {
      ...headers.reqHeader(
        'PATCH',
        body
      )
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.message === 'Updated!') {
          dispatch({
            type: UPDATE_SALARY_REQUEST
          })
          Swal.fire({
            title: 'Updating Salary advance',
            text: data.message,
            timer: 3000,
            icon: 'success'
          })
        } else {
          dispatch({
            type: SALARY_REQUEST_ERROR
          })
          Swal.fire({
            title: 'Updating Salary advance',
            text: data.message,
            timer: 3000,
            icon: 'error'
          })
        }
      }
    ).catch(e => console.error(e));
  };
};

export const cancelSalaryAdvance = (id, history) => {
  return dispatch => {
    dispatch({
      type: LOADING_SALARY_REQUEST
    });
    fetch(`${getBaseUrl()}/salary-advance/${id}`, {
      ...headers.delHeader()
    }).then(res => handleResponse(res)).then(
      data => {
        // if(data.success) {
          dispatch({
            type: CANCEL_SALARY_REQUEST
          });
          Swal.fire({
            title: 'Salary Advance',
            text: data.message,
            icon: 'success',
            timer: 3000
          });
          history.push('/loan/request/salaryadvance_request/list');
        // }
      }
    ).catch(e => console.error(e));
  };
};

