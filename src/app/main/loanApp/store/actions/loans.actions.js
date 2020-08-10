import { fetchHeaders } from "app/shared/fetchHeaders";
import { handleResponse } from "app/auth/handleRes";
import { getBaseUrl } from "app/shared/getBaseUrl";


export const GET_ALL_PENDING_LOAN = 'GET ALL PENDING LOAN';
export const GET_ALL_APPROVED_LOAN = 'GET ALL APPROVED LOAN';
export const EMPLOYEE_LOAN_HISTORY = 'GET EMPLOYEE LOAN HISTORY';
export const LOADING_LOANS = 'LOADING LOANS';
export const GET_ALL_CLOSED_LOAN = 'GET ALL CLOSED LOAN';
export const GET_ALL_OPEN_LOAN = 'GET ALL OPEN LOAN';
export const GET_ALL_REVIEWED_LOAN = 'GET ALL REVIEWED LOAN';
export const GET_RETURNED_LOAN = 'GET RETURNED LOAN'

const header = fetchHeaders();
export const getPendingLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/department/request`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data) {
          dispatch({
            type: GET_ALL_PENDING_LOAN,
            payload: data.data ? data.data : []
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getReviewedLoan = () => {
  return dispatch => {
    fetch(`${getBaseUrl()}/loan/all/reviewed`, {
      ...header.getRegHeader()
    }).then(res => handleResponse(res)).then(
      data => {
        if(data){
          dispatch({
            type: GET_ALL_REVIEWED_LOAN,
            payload: data.data ? data.data : []
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
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data) {
          dispatch({
            type: GET_ALL_APPROVED_LOAN,
            payload: data.data ? data.data : []
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
    fetch(`${getBaseUrl()}/loan/all/approved`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data) {
          dispatch({
            type: GET_RETURNED_LOAN,
            payload: data.data ? data.data : []
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
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_ALL_OPEN_LOAN,
            payload: data.data
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
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data) {
          dispatch({
            type: GET_ALL_CLOSED_LOAN,
            payload: data.data ? data.data : []
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getEmployeeLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`${getBaseUrl()}/loan/all/log`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: EMPLOYEE_LOAN_HISTORY,
            payload: data.loanData
          })
        }
      }
    ).catch(e => console.error(e))
  }
};
