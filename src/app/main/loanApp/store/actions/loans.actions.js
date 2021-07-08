import { fetchHeaders } from "app/shared/fetchHeaders";
import { handleResponse } from "app/auth/handleRes";
import { getBaseUrl } from "app/shared/getBaseUrl";
import { useAuth } from "app/hooks/useAuth";

const token = useAuth;
export const GET_ALL_PENDING_LOAN = 'GET ALL PENDING LOAN';
export const GET_ALL_APPROVED_LOAN = 'GET ALL APPROVED LOAN';

export const EMPLOYEE_DISBURSED_LOAN_HISTORY = 'GET EMPLOYEE DISBURSED LOAN HISTORY';
export const EMPLOYEE_CLOSED_LOAN_HISTORY = 'GET EMPLOYEE COMPLETED LOAN HISTORY';
export const EMPLOYEE_REVIEWED_LOAN_HISTORY = 'GET EMPLOYEE REVIEWED LOAN HISTORY';
export const EMPLOYEE_PENDING_LOAN_HISTORY = 'GET EMPLOYEE PENDING LOAN HISTORY';
export const EMPLOYEE_REJECTED_LOAN_HISTORY = 'GET EMPLOYE REJECTED LOAN HISTORY';
export const EMPLOYEE_CORRECTED_LOAN_HISTORY = 'GET EMPLOYEE CORRECTED LOAN HISTORY';
export const EMPLOYEE_APPROVED_LOAN_HISTORY = 'GET EMPLOYEE APPROVED LOAN HISTORY';

export const LOADING_LOANS = 'LOADING LOANS';
export const GET_ALL_CLOSED_LOAN = 'GET ALL CLOSED LOAN';
export const GET_ALL_OPEN_LOAN = 'GET ALL OPEN LOAN';
export const GET_ALL_REVIEWED_LOAN = 'GET ALL REVIEWED LOAN';
export const GET_RETURNED_LOAN = 'GET RETURNED LOAN'
export const GET_DISBURSED_LOAN = 'GET DISBURSED LOAN'

const header = fetchHeaders();

export const getPendingLoan = () => {
  const arr = [];
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/pending`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          let response = data.data;
          response.splice(response.length - 1, 1);

          dispatch({
            type: GET_ALL_PENDING_LOAN,
            payload: response || []
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getReviewedLoan = () => {
  return dispatch => {
    fetch(`${getBaseUrl()}/loan/all/reviewed`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => handleResponse(res)).then(
      data => {
        if (data.success) {
          let response = data.data;
          response.splice(response.length - 1, 1);

          dispatch({
            type: GET_ALL_REVIEWED_LOAN,
            payload: response || []
          })
        }
      }
    ).catch(e => console.error);
  }
};

export const getApprovedLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/approved`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          let response = data.data;
          response.splice(response.length - 1, 1);

          dispatch({
            type: GET_ALL_APPROVED_LOAN,
            payload: response || []
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getDisbursedLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/disbursed`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          let response = data.data;
          response.splice(response.length - 1, 1);

          console.log(response)
          dispatch({
            type: GET_DISBURSED_LOAN,
            payload: response || []
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getReturnedLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/returned`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          let response = data.data;
          response.splice(response.length - 1, 1);
          console.log(response);

          dispatch({
            type: GET_RETURNED_LOAN,
            payload: response || []
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getOpenLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/open`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          let response = data.data;
          response.splice(response.length - 1, 1);

          dispatch({
            type: GET_ALL_OPEN_LOAN,
            payload: response || []
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getClosedLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/closed`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          let response = data.data;
          response.splice(response.length - 1, 1);

          dispatch({
            type: GET_ALL_CLOSED_LOAN,
            payload: response || []
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getEmployeeLoanDusbursed = (offset = 0, limit = 10) => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/log?offset=${offset}&limit=${10}&status=disbursed`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          if (data.message === 'No record found') {
            dispatch({
              type: EMPLOYEE_DISBURSED_LOAN_HISTORY,
              payload: []
            })
          } else {
            dispatch({
              type: EMPLOYEE_DISBURSED_LOAN_HISTORY,
              payload: data.data.rows
            })
          }
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getEmployeeLoanPending = (offset = 0, limit = 10) => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/log?offset=${offset}&limit=${10}&status=pending`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          if (data.message === 'No record found') {
            dispatch({
              type: EMPLOYEE_PENDING_LOAN_HISTORY,
              payload: []
            })
          } else {
            dispatch({
              type: EMPLOYEE_PENDING_LOAN_HISTORY,
              payload: data.data.rows
            })
          }
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getEmployeeLoanClosed = (offset = 0, limit = 10) => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/log?offset=${offset}&limit=${10}&status=closed`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          if (data.message === 'No record found') {
            dispatch({
              type: EMPLOYEE_CLOSED_LOAN_HISTORY,
              payload: []
            })
          } else {
            dispatch({
              type: EMPLOYEE_CLOSED_LOAN_HISTORY,
              payload: data.data.rows
            })
          }
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getEmployeeLoanRejected = (offset = 0, limit = 10) => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/log?offset=${offset}&limit=${10}&status=rejected`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          if (data.message === 'No record found') {
            dispatch({
              type: EMPLOYEE_REJECTED_LOAN_HISTORY,
              payload: []
            })
          } else {
            dispatch({
              type: EMPLOYEE_REJECTED_LOAN_HISTORY,
              payload: data.data.rows
            })
          }
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getEmployeeLoanReviewed = (offset = 0, limit = 10) => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/log?offset=${offset}&limit=${10}&status=reviewed`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          if (data.message === 'No record found') {
            dispatch({
              type: EMPLOYEE_REVIEWED_LOAN_HISTORY,
              payload: []
            })
          } else {
            dispatch({
              type: EMPLOYEE_REVIEWED_LOAN_HISTORY,
              payload: data.data.rows
            })
          }
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getEmployeeLoanCorrected = (offset = 0, limit = 10) => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/log?offset=${offset}&limit=${10}&status=corrected`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          if (data.message === 'No record found') {
            dispatch({
              type: EMPLOYEE_CORRECTED_LOAN_HISTORY,
              payload: []
            })
          } else {
            dispatch({
              type: EMPLOYEE_CORRECTED_LOAN_HISTORY,
              payload: data.data.rows
            })
          }
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getEmployeeLoanApproved = (offset = 0, limit = 10) => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/log?offset=${offset}&limit=${10}&status=approved`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        console.log({ data })
        if (data.success) {
          if (data.message === 'No record found') {
            dispatch({
              type: EMPLOYEE_APPROVED_LOAN_HISTORY,
              payload: []
            })
          } else {
            dispatch({
              type: EMPLOYEE_APPROVED_LOAN_HISTORY,
              payload: data.data.rows
            })
          }
        }
      }
    ).catch(e => console.error(e))
  }
};

// export const getEmployeeLoanApproved = (offset = 0, limit = 10) => {
//   return dispatch => {
//     dispatch({
//       type: LOADING_LOANS
//     })
//     fetch(`${getBaseUrl()}/loan/all/log?offset=${offset}&limit=${10}&status=cancelled`, {
//       headers: {
//         Authorization: `JWT ${token().getToken}`
//       }
//     }).then(res => res.json()).then(
//       data => {
//         if (data.success) {
//           if (data.message === 'No record found') {
//             dispatch({
//               type: EMPLOYEE_REVIEWED_LOAN_HISTORY,
//               payload: []
//             })
//           } else {
//             dispatch({
//               type: EMPLOYEE_REVIEWED_LOAN_HISTORY,
//               payload: data.loanData
//             })
//           }
//         }
//       }
//     ).catch(e => console.error(e))
//   }
// };
