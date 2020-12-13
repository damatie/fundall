import { handleResponse } from "app/auth/handleRes";
import { fetchHeaders } from "app/shared/fetchHeaders";
import { getBaseUrl } from "app/shared/getBaseUrl";
import swal from 'sweetalert2';
import { getApprovedSA, getOpenSA, getPendingSA } from "./salaryAdvanceLoans.actions";
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

      if (result.message == 'Approved') {
        swal.fire({
          title: 'Approve salary advance',
          text: result.message,
          icon: 'success',
          timer: 3000
        });
        dispatch(getSalaryAdvanceDetails(id));
        dispatch(getApprovedSA());
        dispatch(getPendingSA());
      } else {
        swal.fire({
          title: 'Approve salary advance',
          text: result.message,
          icon: 'error',
          timer: 3000
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
                swal.fire({
                  title: 'Reject Loan',
                  text: data.message,
                  icon: 'success',
                  timer: 3000
                })
                dispatch(getSalaryAdvanceDetails(id));
                dispatch(getApprovedSA());
                dispatch(getPendingSA());
              } else {
                swal.fire({
                  title: 'Reject Loan',
                  text: data.message,
                  icon: 'error',
                  timer: 3000
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
        swal.fire({
          title: 'Cancel salary advance',
          text: result.message,
          icon: 'success',
          timer: 3000
        });
        dispatch(getOpenSA());
        dispatch(getSalaryAdvanceDetails(id))
      } else {
        swal.fire({
          title: 'Cancel salary advance',
          text: result.message,
          icon: 'error',
          timer: 3000
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

