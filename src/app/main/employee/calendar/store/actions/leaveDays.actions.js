import { fetchHeaders } from "app/shared/fetchHeaders";
import { useAuth } from "app/hooks/useAuth";

export const GET_LEAVE_DAYS = 'GET LEAVE DAYS';
export const LOADING_LEAVE_DAYS = 'LOADING LEAVE DAYS';
const  id = useAuth
const header = fetchHeaders();
export const getLeaveDays = () => {
  return dispatch => {
    dispatch({
      type: LOADING_LEAVE_DAYS
    })
    fetch(`https://hris-cbit.herokuapp.com/api/v1/allot-leave/one-employee/${id().getId}`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_LEAVE_DAYS,
            payload: data.data
          })
        }
      }
    ).catch(e => console.error(e))
  }
}