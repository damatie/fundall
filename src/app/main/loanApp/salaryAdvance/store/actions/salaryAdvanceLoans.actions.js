import { handleResponse } from "app/auth/handleRes";
import { fetchHeaders } from "app/shared/fetchHeaders";

export const GET_PENDING_SA = 'GET PENDING SA';
export const LOADING_SA = 'LOADING SA';
export const PENDING_SA_ERROR = 'PENDING SA ERROR';
export const GET_APPROVED_SA = 'GET APPROVED SA';
export const LOADING_APPROVED_SA = 'LOADING APPROVED SA';
export const GET_OPEN_SA = 'GET OPEN SA';
export const LOADING_OPEN_SA = 'LOADING OPEN SA';
export const GET_CLOSED_SA = 'GET CLOSED SA';
export const LOADING_CLOSED_SA = 'LOADING CLOSED SA';

const formateData = data => {
  const arr = [];
  for(let i of data) {
    arr.push(
      {
        ...i,
        ...i.employee
      }
    )
  }
  return arr;
}
const headers = fetchHeaders();
export const getPendingSA = () => {
  return dispatch => {
    dispatch({
      type: LOADING_SA
    });
    fetch('https://hris-cbit.herokuapp.com/api/v1/salary-advance/all/pending', {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_PENDING_SA,
            payload: formateData(data.salaryAdvanceData),
          })
        }
      }
    ).catch(e => console.error(e));
  }
};

export const getApprovedSA = () => {
  return dispatch => {
    dispatch({
      type: LOADING_APPROVED_SA
    });
    fetch('https://hris-cbit.herokuapp.com/api/v1/salary-advance/all/approved', {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_APPROVED_SA,
            payload: formateData(data.salaryAdvanceData),
          })
        }
      }
    ).catch(e => console.error(e));
  }
};

export const getOpenSA = () => {
  return dispatch => {
    dispatch({
      type: LOADING_OPEN_SA
    });
    fetch('https://hris-cbit.herokuapp.com/api/v1/salary-advance/all/open', {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_OPEN_SA,
            payload: formateData(data.salaryAdvanceData),
          })
        }
      }
    ).catch(e => console.error(e));
  }
};

export const getClosedSA = () => {
  return dispatch => {
    dispatch({
      type: LOADING_CLOSED_SA
    });
    fetch('https://hris-cbit.herokuapp.com/api/v1/salary-advance/all/closed', {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_CLOSED_SA,
            payload: formateData(data.salaryAdvanceData),
          })
        }
      }
    ).catch(e => console.error(e));
  }
};