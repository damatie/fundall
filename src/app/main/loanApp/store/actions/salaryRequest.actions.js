import { fetchHeaders } from "app/shared/fetchHeaders";
import Swal from 'sweetalert2';
import { getBaseUrl } from "app/shared/getBaseUrl";
import { handleResponse } from "app/auth/handleRes";
import { getSalaryAdvance } from "./salaryAdvance.actions";

export const SALARY_REQUEST = 'SALARY REQUEST';
export const LOADING_SALARY_REQUEST = 'LOADING SALARY REQUEST';
export const SALARY_REQUEST_ERROR = 'SALARY REQUEST ERROR';
export const UPDATE_SALARY_REQUEST = 'UPDATE SALARY REQUEST';
export const CANCEL_SALARY_REQUEST = 'CANCEL SALARY REQUEST';
export const SALARY_ADVANCE_REQUEST_ERROR = 'SALARY ADVANCE REQUEST ERROR';

const headers = fetchHeaders();
export const applySalaryAdvance = (model, file, history) => {

  let payload = new FormData();

  payload.append("amount", Number(model.amount));
  payload.append("repaymentDate", model.repaymentDate);
  payload.append("loanForm", file);

  return dispatch => {
    dispatch({
      type: LOADING_SALARY_REQUEST
    })
    fetch(`${getBaseUrl()}/salary-advance`, {
      ...headers.fdHeader(
        'post', payload
      )
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          Swal.fire({
            title: 'Salary advance request',
            text: data.message,
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: SALARY_REQUEST
          })
          history.push('/loan/request/salaryadvance_request/list');
        } else {
          console.log(data)
          Swal.fire({
            title: 'Salary advance request',
            text: data.message,
            icon: 'error',
            timer: 5000
          })
          dispatch({
            type: SALARY_REQUEST_ERROR
          })
          dispatch({
            type: SALARY_REQUEST_ERROR
          })
        }

      }
    ).catch(e => console.error(e));
  }
};

export const updateSalaryAdvance = (id, model, file, history) => {

  let payload = new FormData();

  payload.append("amount", model.amount);
  payload.append("repaymentDate", model.repaymentDate);
  payload.append("loanForm", file);

  return dispatch => {
    dispatch({
      type: LOADING_SALARY_REQUEST
    });
    fetch(`${getBaseUrl()}/salary-advance/${id}`, {
      ...headers.fdHeader(
        'PATCH',
        payload
      )
    }).then(res => handleResponse(res)).then(
      data => {
        if (data.success) {
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

export const updateSalaryAdvanceByRole = (id, model, file, role, history) => {

  let payload = new FormData();

  payload.append("amount", model.amount);
  payload.append("repaymentDate", model.repaymentDate);
  payload.append("loanForm", file);
  console.log(role)

  return dispatch => {
    dispatch({
      type: LOADING_SALARY_REQUEST
    });
    fetch(`${getBaseUrl()}/salary-advance/approve/${role}/${id}`, {
      ...headers.fdHeader(
        'PATCH',
        payload
      )
    }).then(res => handleResponse(res)).then(
      data => {
        if (data.success) {
          dispatch({
            type: UPDATE_SALARY_REQUEST
          })
          Swal.fire({
            title: 'Updating Salary advance',
            text: data.message,
            timer: 3000,
            icon: 'success'
          }).then(function(){
            window.location = '/loan/salary_advance/list'
          });
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
        dispatch(getSalaryAdvance());
        history.push('/loan/request/salaryadvance_request/list');
        // }
      }
    ).catch(e => console.error(e));
  };
};

