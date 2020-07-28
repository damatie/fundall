import { handleResponse } from "app/auth/handleRes";
import { fetchHeaders } from "app/shared/fetchHeaders";

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const LOADING_NOTIFICATIONS = 'LOADING NOTIFICATIONS';
export const MARK_AS_READ = 'MARK AS READ';

const headers = fetchHeaders();
export const getNotifications = () => {
  return dispatch => {
    dispatch({
      type: LOADING_NOTIFICATIONS
    });
    fetch(`https://hris-cbit.herokuapp.com/api/v1/notification`, {
      ...headers.getRegHeader()
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_NOTIFICATIONS,
            payload: data.data
          });
        }
      }
    ).catch(e => console.error(e));
  }
};