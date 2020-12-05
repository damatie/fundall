import { fetchHeaders } from "app/shared/fetchHeaders";
import { getBaseUrl } from "app/shared/getBaseUrl";

export const ROLES_LOADING = 'ROLES LOADNING';
export const GET_ROLES_ERROR = 'GET ROLES ERROR';
export const GET_ROLES_SUCCESS = 'GET ROLES SUCCESS';

const header = fetchHeaders()

export const getRoles = () => {
  return dispatch => {
    dispatch({
      type: ROLES_LOADING
    })
    fetch(`${getBaseUrl()}/roles`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        // console.log(data)
        if(data.success) {
          dispatch({
            type: GET_ROLES_SUCCESS,
            payload: data.data
          });
        } else {
          dispatch({
            type: GET_ROLES_ERROR,
            payload: []
          })
        }
      }
    ).catch(e => {
      dispatch({
        type: GET_ROLES_ERROR,
        payload: []
      })
      console.error(e)
    })
  }
}