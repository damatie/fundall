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
        let items = []
        if(data.success) {
          items = data.data.filter((obj, index, self) => self.map(itm => itm.name.toLowerCase())
          .indexOf(obj.name.toLowerCase()) === index)
          dispatch({
            type: GET_ROLES_SUCCESS,
            payload: items
          })
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