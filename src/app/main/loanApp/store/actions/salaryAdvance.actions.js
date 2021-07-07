import { fetchHeaders } from "app/shared/fetchHeaders";
import { handleResponse } from "app/auth/handleRes";
import { useAuth } from "app/hooks/useAuth";
import { getBaseUrl } from "app/shared/getBaseUrl";

export const LOADING_SALARY_ADVANCE = 'LOADING SALARY ADVANCE';
export const GET_SALARY_ADVANCE = 'GET SALARY ADVANCE';
export const SALARY_ADVANCE_ERROR = 'SALARY ADVANCE ERROR';
export const GET_SALARY_ADVANCE_DETAILS = 'GET SALARY ADVANCE DETAILS';
export const LOADING_SALARY_ADVANCE_DETAILS = 'LOADING SALARY ADVANCE DETAILS';

const headers = fetchHeaders();
const userId = useAuth().getId;

export const getSalaryAdvance = () => {
  return dispatch => {
    dispatch({
      type: LOADING_SALARY_ADVANCE
    })
    fetch(`${getBaseUrl()}/salary-advance/history/${userId}?offset=0&limit=100`, {
      ...headers.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if (data.success) {
          // console.log(data.data.rows);
          dispatch({
            type: GET_SALARY_ADVANCE,
            payload: data.data.rows
          })
        } else {
          dispatch({
            type: GET_SALARY_ADVANCE,
            payload: []
          })
          dispatch({
            type: SALARY_ADVANCE_ERROR
          })
        }
      }
    ).catch(e => console.error(e));
  }
};

export const getSalaryAdvanceDetails = id => {
  return dispatch => {
    dispatch({
      type: LOADING_SALARY_ADVANCE_DETAILS
    });
    fetch(`${getBaseUrl()}/salary-advance/${id}`, {
      ...headers.getRegHeader()
    }).then(res => handleResponse(res)).then(
      data => {
        // console.log(data);
        if (data.success) {
          dispatch({
            type: GET_SALARY_ADVANCE_DETAILS,
            payload: data
          })
        }
      }
    ).catch(e => console.error(e));
  };
};