import { fetchHeaders } from "app/shared/fetchHeaders";
import { useAuth } from "app/hooks/useAuth"


export const LOADING_USER_MENU = 'LOADING LEAVES';
export const GET_USER_MENU = 'GET USER MENU';
export const GET_APPROVED_USER_MENU = 'GET APPROVED USER MENU';
export const GET_REVIEWED_USER_MENU = 'GET REVIEWED USER MENU';
export const USER_MENU_SUCCESS = 'USER MENU SUCCESS';
export const USER_MENU_ERROR = 'USER MENU ERROR';

const header = fetchHeaders();
const token = useAuth;
export const getPendingLeaveReq = () => {
  return dispatch => {
    dispatch({
      type: LOADING_USER_MENU
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/employee-leave/pending/all`, {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      async data => {
        console.log(data);
        dispatch({
          type: GET_PENDING_USER_MENU,
          payload: data.data
        })
        dispatch({
          type: USER_MENU_SUCCESS
        })
      }
    ).catch(e => {
      dispatch({
        type: GET_PENDING_USER_MENU,
        payload: []
      })
    })
  }
}

export const getApprovedLeaveReq = () => {
  return dispatch => {
    dispatch({
      type: LOADING_USER_MENU
    })
    fetch('https://hris-cbit.herokuapp.com/api/v1/employee-leave/approved/all', {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        dispatch({
          type: GET_APPROVED_USER_MENU,
          payload: data.data
        })
        dispatch({
          type: USER_MENU_SUCCESS
        })
      }
    ).catch(e => {
      dispatch({
        type: GET_APPROVED_USER_MENU,
        payload: []
      })
    })
  }
}

export const getReviewedLeaveReq = () => {
  return dispatch => {
    dispatch({
      type: LOADING_USER_MENU
    })
    fetch('https://hris-cbit.herokuapp.com/api/v1/employee-leave/reviewed/all', {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    }).then(res => res.json()).then(
      data => {
        dispatch({
          type: GET_REVIEWED_USER_MENU,
          payload: data.data
        })
        dispatch({
          type: USER_MENU_SUCCESS
        })
      }
    ).catch(e => {
      dispatch({
        type: GET_REVIEWED_USER_MENU,
        payload: []
      })
    })
  }
}