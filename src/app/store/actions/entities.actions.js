import { fetchHeaders } from "app/shared/fetchHeaders";
import { getBaseUrl } from "app/shared/getBaseUrl";

export const ENTITIES_LOADING = 'ENTITIES LOADNING';
export const GET_ENTITIES_ERROR = 'GET ENTITIES ERROR';
export const GET_ENTITIES_SUCCESS = 'GET ENTITIES SUCCESS';

const header = fetchHeaders()

export const getEntities = () => {
  return dispatch => {
    dispatch({
      type: ENTITIES_LOADING
    })
    fetch(`${getBaseUrl()}/entity/all`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        console.log(data)
        if(data.success) {
          dispatch({
            type: GET_ENTITIES_SUCCESS,
            payload: data.data
          });
        } else {
          dispatch({
            type: GET_ENTITIES_ERROR,
            payload: []
          })
        }
      }
    ).catch(e => {
      dispatch({
        type: GET_ENTITIES_ERROR,
        payload: []
      })
      console.error(e)
    })
  }
}