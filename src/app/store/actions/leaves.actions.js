import { fetchHeaders } from "app/shared/fetchHeaders";
import { useAuth } from "app/hooks/useAuth"


export const LOADING_LEAVE_REQUEST = 'LOADING LEAVES';
export const GET_PENDING_LEAVE_REQUEST = 'GET PENDING LEAVE REQUEST';
export const GET_APPROVED_LEAVE_REQUEST = 'GET APPROVED LEAVE REQUEST';
export const GET_REVIEWED_LEAVE_REQUEST = 'GET REVIEWED LEAVE REQUEST';
export const LEAVE_REQUEST_SUCCESS = 'LEAVE REQUEST SUCCESS';
export const LEAVE_REQUEST_ERROR = 'LEAVE REQUEST ERROR';

const header = fetchHeaders();
const token = useAuth;
export const getPendingLeaveReq = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LEAVE_REQUEST
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/employee-leave/pending/all`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      async data => {
        // console.log(data);
        dispatch({
          type: GET_PENDING_LEAVE_REQUEST,
          payload: data.data
        })
        dispatch({
          type: LEAVE_REQUEST_SUCCESS
        })
      }
    ).catch(e => {
      dispatch({
        type: GET_PENDING_LEAVE_REQUEST,
        payload: []
      })
    })
  }
}

export const getApprovedLeaveReq = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LEAVE_REQUEST
    })
    fetch('https://hris-cbit.herokuapp.com/api/v1/employee-leave/approved/all', {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        dispatch({
          type: GET_APPROVED_LEAVE_REQUEST,
          payload: data.data
        })
        dispatch({
          type: LEAVE_REQUEST_SUCCESS
        })
      }
    ).catch(e => {
      dispatch({
        type: GET_APPROVED_LEAVE_REQUEST,
        payload: []
      })
    })
  }
}

export const getReviewedLeaveReq = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LEAVE_REQUEST
    })
    fetch('https://hris-cbit.herokuapp.com/api/v1/employee-leave/reviewed/all', {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        dispatch({
          type: GET_REVIEWED_LEAVE_REQUEST,
          payload: data.data
        })
        dispatch({
          type: LEAVE_REQUEST_SUCCESS
        })
      }
    ).catch(e => {
      dispatch({
        type: GET_REVIEWED_LEAVE_REQUEST,
        payload: []
      })
    })
  }
}