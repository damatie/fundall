import { fetchHeaders } from "app/shared/fetchHeaders";

export const GET_LEAVE_REQUEST_DETAILS = 'GET LEAVE REQUEST DETAILS';
export const LOADING_LEAVE_REQUEST_DETAILS = 'LOADING LEAVE REQUEST DETAILS';
export const LEAVE_REQUEST_SUCCESS = 'LEAVE REQUEST SUCCESS';
export const LEAVE_REQUEST_ERROR = 'LEAVE REQUEST ERROR';

const header = fetchHeaders();
export const getLeaveReqDetails = id => {
  return dispatch => {
    dispatch({
      type: LOADING_LEAVE_REQUEST_DETAILS
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/employee-leave/${id}`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_LEAVE_REQUEST_DETAILS,
            payload: data.data
          })
          dispatch({
            type: LEAVE_REQUEST_SUCCESS
          })
        } else {
          dispatch({
            type: LEAVE_REQUEST_ERROR
          })
        }
      }
    ).catch(e => console.error)
  }
}