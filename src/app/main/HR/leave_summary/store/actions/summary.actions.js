import { getBaseUrl } from "app/shared/getBaseUrl";
import { fetchHeaders } from "app/shared/fetchHeaders";
import { handleResponse } from "app/auth/handleRes";

export const GET_LEAVE_SUMMARY = 'GET LEAVE SUMMARY';
export  const LOADING_LEAVE_SUMMARY = 'LOADING LEAVE SUMMARY';

export const GET_ONE_LEAVE_SUMMARY = 'GET ONE LEAVE SUMMARY';

export const getOneLeaveSummary = (data) => {
  return dispatch => {
    dispatch({
      type: GET_ONE_LEAVE_SUMMARY,
      payload: data
    })
  };
};



const headers = fetchHeaders();
export const getLeaveSummary = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LEAVE_SUMMARY
    });
    fetch(`${getBaseUrl()}/employee-leave/user`, {
      ...headers.getRegHeader(),
    }).then(res => handleResponse(res)).then(
      data => {
        // // console.log(data)
        if(data.success) {
          dispatch({
            type: GET_LEAVE_SUMMARY,
            payload: data.data
          })
        } else {
          dispatch({
            type: GET_LEAVE_SUMMARY,
            payload: [],
          })
        }
      }
    ).catch(e => console.error(e));
  }
};

