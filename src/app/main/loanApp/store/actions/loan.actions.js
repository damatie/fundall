import { fetchHeaders } from "app/shared/fetchHeaders";
import swal from 'sweetalert2';
import { handleResponse } from "app/auth/handleRes";
import { getBaseUrl } from "app/shared/getBaseUrl";
import {
  getEmployeeLoanApproved,
  getEmployeeLoanClosed,
  getEmployeeLoanCorrected,
  getEmployeeLoanDusbursed,
  getEmployeeLoanPending,
  getEmployeeLoanRejected,
  getEmployeeLoanReviewed
} from "./loans.actions";

export const APPROVE_LOAN = 'APPROVE LOAN';
export const REJECT_LOAN = 'REJECT LOAN';
export const APPLY_LOAN = 'APPLY LOAN';
export const LOAN_SUCCESS = 'LOAN SUCCESS';
export const LOAN_ERROR = 'LOAN ERROR';
export const LOADING_LOAN = 'LOANDING LOAN';
export const GET_LOAN = 'GET LOAN';
export const UPDATING_LOAN = 'UPDATING LOAN';
export const UPDATE_SUCCESS = 'UPDATE SUCCESS';
export const CLOSING_LOAN = 'CLOSING LOAN';
export const CLOSED_SUCCESS = 'CLOSED SUCCESS';

const header = fetchHeaders();

export const approveLoan = ({ id, body, url, history }) => {
  return dispatch => {
    swal.showLoading();
    fetch(`${getBaseUrl()}${url}${id}`, {
      ...header.formDHeader(
        'PATCH',
        body
      )
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          swal.fire({
            title: 'Approve Loan',
            text: data.message,
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: LOAN_SUCCESS
          })
          dispatch(getLoan(id));
          history.push({
            pathname: '/loan/review/list'
          });
        } else {
          swal.fire({
            title: 'Approve Loan',
            text: data.message,
            icon: 'error',
            timer: 3000
          })
          dispatch({
            type: LOAN_ERROR
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const confirmDisbursement = ({ id, history }) => {
  return dispatch => {
    swal.showLoading();
    fetch(`${getBaseUrl()}/loan/confirm/disbursement/${id}`, {
      ...header.reqHeader(
        'PATCH',
      )
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          swal.fire({
            title: 'Approve Loan',
            text: data.message,
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: LOAN_SUCCESS
          })
          dispatch(getLoan(id));
          history.push({
            pathname: '/loan/request/list'
          });
        } else {
          swal.fire({
            title: 'Approve Loan',
            text: data.message,
            icon: 'error',
            timer: 3000
          })
          dispatch({
            type: LOAN_ERROR
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const rejectLoan = ({ id, url }, history) => {
  return dispatch => {
    swal.fire({
      title: 'Reason for rejecting this loan',
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
          fetch(`${getBaseUrl()}${url}${id}`, {
            ...header.reqHeader('PATCH', {
              comment: input
            })
          }).then(res => res.json()).then(
            data => {
              if (data.success) {
                swal.fire({
                  title: 'Reject Loan',
                  text: data.message,
                  icon: 'success',
                  timer: 3000
                })
                history.push({
                  pathname: '/loan/review/list'
                })
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
          swal.showValidationMessage('Please enter your message')
        }
      }
    })
  }
};

export const applyLoan = (body, history) => {

  return dispatch => {
    dispatch({
      type: LOADING_LOAN
    })
    fetch(`${getBaseUrl()}/loan`, {
      ...header.formDHeader(
        'POST',
        body
      )
    }).then(res => res.json()).then(
      data => {
        console.log(data)
        if (data.success) {
          swal.fire({
            title: 'Loan application',
            text: 'Loan applied successfully',
            icon: 'success',
            timer: 3000
          })
          dispatch({
            type: LOAN_SUCCESS
          })
          // dispatch(getEmployeeLoanApproved())
          // dispatch(getEmployeeLoanClosed())
          // dispatch(getEmployeeLoanCorrected())
          // dispatch(getEmployeeLoanDusbursed())
          // dispatch(getEmployeeLoanPending())
          // dispatch(getEmployeeLoanRejected())
          // dispatch(getEmployeeLoanReviewed())
          history.push('/loan/request/list')
        }
        else {
          swal.fire({
            title: 'Loan application',
            text: data.mesage || data.message,
            icon: 'error',
            timer: 3000
          })
          dispatch({
            type: LOAN_ERROR
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getLoan = id => {
  return dispatch => {
    dispatch({
      type: LOADING_LOAN
    })
    fetch(`${getBaseUrl()}/loan/${id}`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        dispatch({
          type: GET_LOAN,
          payload: {
            ...data,
          }
        })
      }
    ).catch(e => console.error(e))
  }
};

export const updateLoan = (id, body, history, user) => {
  return dispatch => {
    dispatch({
      type: UPDATING_LOAN
    })
    fetch(`${getBaseUrl()}/loan/${id}`, {
      ...header.reqHeader(
        'PATCH',
        body
      ),
    }).then(res => handleResponse(res)).then(
      data => {
        // if(data.success) {
        dispatch({
          type: UPDATE_SUCCESS
        });
        swal.fire({
          title: 'Loan',
          text: data.message,
          icon: 'success',
          timer: 2000
        });
        dispatch(getEmployeeLoanApproved())
        dispatch(getEmployeeLoanClosed())
        dispatch(getEmployeeLoanCorrected())
        dispatch(getEmployeeLoanDusbursed())
        dispatch(getEmployeeLoanPending())
        dispatch(getEmployeeLoanRejected())
        dispatch(getEmployeeLoanReviewed())
        history.push('/loan/request/list');
        history.go(0);
        // }
      }
    ).catch(e => console.error(e));
  }
};

export const cancelLoan = (id, history) => {
  console.log(id, " to be deleted")
  return dispatch => {
    swal.showLoading();
    fetch(`${getBaseUrl()}/loan/employee/cancel/${id}`, {
      ...header.reqHeader("PATCH", {}),
    }).then(res => res.json()).then(
      data => {
        console.log(data)
        if (data.success) {
          swal.fire({
            title: 'Loan',
            text: data.message,
            icon: 'success',
            timer: 2000
          });
          dispatch({
            type: CLOSED_SUCCESS
          });
          dispatch(getEmployeeLoanApproved())
          dispatch(getEmployeeLoanClosed())
          dispatch(getEmployeeLoanCorrected())
          dispatch(getEmployeeLoanDusbursed())
          dispatch(getEmployeeLoanPending())
          dispatch(getEmployeeLoanRejected())
          dispatch(getEmployeeLoanReviewed())
          // dispatch(getEmployeeLoan());
          history.push('/loan/request/list')
        } else {
          swal.fire({
            title: 'Loan',
            text: data.message,
            icon: 'error',
            timer: 2000
          });
        }
      }
    ).catch(e => console.error(e));
  }
}

export const closeLoan = (id, history) => {
  console.log(id, " to be deleted")
  return dispatch => {
    swal.showLoading();
    fetch(`${getBaseUrl()}/loan/close/${id}`, {
      ...header.reqHeader("PATCH", {}),
    }).then(res => res.json()).then(
      data => {
        console.log(data)
        if (data.success) {
          swal.fire({
            title: 'Loan',
            text: data.message,
            icon: 'success',
            timer: 2000
          });
          dispatch({
            type: CLOSED_SUCCESS
          });
          history.push('/loan/review/list')
        } else {
          swal.fire({
            title: 'Loan',
            text: data.message,
            icon: 'error',
            timer: 2000
          });
        }
      }
    ).catch(e => console.error(e));
  }
}

export const confrimLoan = (id) => {
  return async dispatch => {
    try {
      swal.showLoading();
      const result = await fetch(`${getBaseUrl()}/loan/confirm/${id}`, {
        ...header.reqHeader('PATCH', {})
      }).then(res => handleResponse(res));
      if (result.success) {
        swal.fire({
          title: 'Accept loan',
          text: result.message,
          icon: 'success',
          timer: 2500
        });
        dispatch(getEmployeeLoanApproved())
        dispatch(getEmployeeLoanClosed())
        dispatch(getEmployeeLoanCorrected())
        dispatch(getEmployeeLoanDusbursed())
        dispatch(getEmployeeLoanPending())
        dispatch(getEmployeeLoanRejected())
        dispatch(getEmployeeLoanReviewed())
        // dispatch(getEmployeeLoan());
      } else {
        swal.fire({
          title: 'Accept loan Error',
          text: result.message,
          icon: 'error',
          timer: 2500
        });
      }
    } catch (e) {
      swal.fire({
        title: 'Server Error',
        text: 'Service unavailable',
        icon: 'error',
        timer: 2500
      });
    }

  }
}