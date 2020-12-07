import { handleResponse } from "app/auth/handleRes";
import { fetchHeaders } from "app/shared/fetchHeaders";
import { getBaseUrl } from "app/shared/getBaseUrl";
import { desSort } from "app/shared/sortData";

export const GET_PENDING_SA = 'GET PENDING SA';
export const LOADING_SA = 'LOADING SA';
export const PENDING_SA_ERROR = 'PENDING SA ERROR';
export const GET_APPROVED_SA = 'GET APPROVED SA';
export const LOADING_APPROVED_SA = 'LOADING APPROVED SA';
export const GET_OPEN_SA = 'GET OPEN SA';
export const LOADING_OPEN_SA = 'LOADING OPEN SA';
export const GET_CLOSED_SA = 'GET CLOSED SA';
export const LOADING_CLOSED_SA = 'LOADING CLOSED SA';
export const GET_REVIEWED_SA = 'GET REVIEWED SA';
export const LOADING_REVIEWED_SA = 'LOANDING REVIEWED SA';

const formateData = (data) => {
  const arr = [];
  for (let i of data) {
    arr.push(
      {
        loanId: i.id,
        ...i,
        ...i.employee
      }
    )
  }
  return desSort(arr);
}

const pendingLoans = (data) => {
  const arr = [];
  for (let i of data) {
    if (i.status === 'pending') {
      arr.push(
        {
          loanId: i.id,
          ...i,
          ...i.employee
        }
      )
    }

  }
  return desSort(arr);
}

const formateDatas = data => {
  const arr = [];
  for (let i of data) {
    arr.push(
      {
        loanId: i.salaryAdvance.id,
        ...i.salaryAdvance,
        ...i.employee
      }
    )
  }
  return desSort(arr);
}

const headers = fetchHeaders();

export const getPendingSA = () => {
  return dispatch => {
    dispatch({
      type: LOADING_SA
    });
    fetch(`${getBaseUrl()}/salary-advance/all/pending`, {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        let response = data.data;
        response.splice(0, 1);

        // console.log(data, response)
        if (data.success) {
          dispatch({
            type: GET_PENDING_SA,
            payload: formateDatas(response),
          });
        }
      }
    ).catch(e => console.error(e));
  }
};

export const getReviewedSA = () => {
  return dispatch => {
    dispatch({
      type: LOADING_REVIEWED_SA
    });
    fetch(`${getBaseUrl()}/salary-advance/all/reviewed1?offset=0&limit=50`, {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        let response = data.data;
        response.splice(0, 1);
        // console.log(data)
        if (data.success) {
          dispatch({
            type: GET_REVIEWED_SA,
            payload: formateDatas(response),
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
    fetch(`${getBaseUrl()}/salary-advance/all/reviewed2?offset=0&limit=50`, {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        console.log(formateDatas(data.data))
        if (data.success) {
          dispatch({
            type: GET_APPROVED_SA,
            payload: formateDatas(data.data),
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
    fetch(`${getBaseUrl()}/salary-advance/all/open`, {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        if (data.success) {
          dispatch({
            type: GET_OPEN_SA,
            payload: formateDatas(data.data),
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
    fetch(`${getBaseUrl()}/salary-advance/all/closed`, {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        if (data.success) {
          dispatch({
            type: GET_CLOSED_SA,
            payload: formateDatas(data.data),
          })
        }
      }
    ).catch(e => console.error(e));
  }
};


