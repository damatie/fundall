import { handleResponse } from "app/auth/handleRes";
import { fetchHeaders } from "app/shared/fetchHeaders";
import { getBaseUrl } from "app/shared/getBaseUrl";
import swal from 'sweetalert2';
import { getApprovedSA, getDisbursedSA, getOpenSA, getPendingSA, getReviewedSA } from "./salaryAdvanceLoans.actions";
import { getSalaryAdvanceDetails } from "app/main/loanApp/store/actions";

export const APPROVE_SALARY_ADVANCE = 'APPROVE SALARY ADVANCE';
export const REJECT_SALARY_ADVANCE = 'REJECT SALARY ADVANCE';
export const CANCEL_SALARY_ADVANCE = 'CANCEL SALARY ADVANCE';

const headers = fetchHeaders();
export const approveSalaryAvance = ({ id, url }) => {
  return async dispatch => {
    try {
      swal.showLoading();
      const result = await fetch(`${getBaseUrl()}${url}${id}`, {
        ...headers.reqHeader(
          'PATCH',
          {},
        )
      }).then(res => handleResponse(res));

      if (result.success) {
        dispatch(getSalaryAdvanceDetails(id));
        dispatch(getApprovedSA());
        dispatch(getPendingSA());
        dispatch(getReviewedSA());
        dispatch(getDisbursedSA());
        swal.fire({
          title: 'Salary advance',
          text: result.message,
          icon: 'success'
        });
      } else {
        swal.fire({
          title: 'Approve salary advance',
          text: result.message,
          icon: 'error'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const rejectSalaryAdvance = ({ id, url, payload }) => {
  return async dispatch => {
    swal.fire({
      title: 'Reason for Rejecting',
      input: 'textarea',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      preConfirm: (input) => {
        if (input) {
          swal.showLoading();
          payload.comment = input;

          fetch(`${getBaseUrl()}${url}${id}`, {
            ...headers.reqHeader('PATCH', payload)
          }).then(res => res.json()).then(
            data => {
              if (data.success) {
                dispatch(getSalaryAdvanceDetails(id));
                dispatch(getApprovedSA());
                dispatch(getPendingSA());
                swal.fire({
                  title: 'Reject Loan',
                  text: data.message,
                  icon: 'success'
                }).then(function(){
                  window.location = '/loan/salary_advance/list'
                });
              } else {
                swal.fire({
                  title: 'Reject Loan',
                  text: data.message,
                  icon: 'error'
                })
              }
            }
          ).catch(e => {
            console.error(e)
          });
        } else {
          swal.showValidationMessage('Please enter a message')
        }
      }
    })
  };
};

export const cancelSalaryAdvance = (id) => {
  return async dispatch => {
    try {
      swal.showLoading();
      const result = await fetch(`${getBaseUrl()}/salary-advance/close/${id}`, {
        ...headers.reqHeader(
          'PATCH',
          {},
        )
      }).then(res => handleResponse(res));

      if (result.success) {
        dispatch(getOpenSA());
        dispatch(getSalaryAdvanceDetails(id))
        swal.fire({
          title: 'Cancel salary advance',
          text: result.message,
          icon: 'success'
        });
      } else {
        swal.fire({
          title: 'Cancel salary advance',
          text: result.message,
          icon: 'error'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

