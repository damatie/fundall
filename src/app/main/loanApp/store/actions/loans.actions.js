import { fetchHeaders } from "app/shared/fetchHeaders";


export const GET_ALL_PENDING_LOAN = 'GET ALL PENDING LOAN';
export const GET_ALL_APPROVED_LOAN = 'GET ALL APPROVED LOAN';
export const EMPLOYEE_LOAN_HISTORY = 'GET EMPLOYEE LOAN HISTORY';
export const LOADING_LOANS = 'LOADING LOANS';
export const GET_ALL_CLOSED_LOAN = 'GET ALL CLOSED LOAN';
export const GET_ALL_OPEN_LOAN = 'GET ALL OPEN LOAN';

const header = fetchHeaders();
export const getPendingLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/all/pending`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        console.log(data)
        if(data.success) {
          dispatch({
            type: GET_ALL_PENDING_LOAN,
            payload: data.loanData
          })
        }
      }
    ).catch(e => console.error(e))
  }
};

export const getApprovedLoan = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LOANS
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/all/approved`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_ALL_APPROVED_LOAN,
            payload: data.loanData
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
    fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/all/open`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_ALL_OPEN_LOAN,
            payload: data.loanData
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
    fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/all/closed`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_ALL_CLOSED_LOAN,
            payload: data.loanData
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
    fetch(`https://hris-cbit.herokuapp.com/api/v1/loan/all/log`, {
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
