import { fetchHeaders } from "app/shared/fetchHeaders";
import Swal from 'sweetalert2';
import { getBaseUrl } from "app/shared/getBaseUrl";

export const SALARY_REQUEST = 'SALARY REQUEST';
export const LOADING_SALARY_REQUEST = 'LOADING SALARY REQUEST';
export const SALARY_REQUEST_ERROR = 'SALARY REQUEST ERROR';

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
        } 
        if(data.success === false) {
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
    ).catch(e => console.error(e));
  }
};

