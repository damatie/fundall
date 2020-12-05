import { fetchHeaders } from "app/shared/fetchHeaders";
import { getBaseUrl } from "app/shared/getBaseUrl";
import { useAuth } from 'app/hooks/useAuth';

export const DEPARTMENTS_LOADING = 'DEPARTMENTS LOADNING';
export const GET_DEPARTMENTS_ERROR = 'GET DEPARTMENTS ERROR';
export const GET_DEPARTMENTS_SUCCESS = 'GET DEPARTMENTS SUCCESS';

const header = fetchHeaders()
const userData = useAuth().getUserProfile

function entity(){
  return (userData.entity) ? userData.entity.id : 0;
}

export const getDepartments = () => {
  return dispatch => {
    dispatch({
      type: DEPARTMENTS_LOADING
    })
    fetch(`${getBaseUrl()}/department/all/${entity()}`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        console.log(data)
        if(data.success) {
          dispatch({
            type: GET_DEPARTMENTS_SUCCESS,
            payload: data.data
          });
        } else {
          dispatch({
            type: GET_DEPARTMENTS_ERROR,
            payload: []
          })
        }
      }
    ).catch(e => {
      dispatch({
        type: GET_DEPARTMENTS_ERROR,
        payload: []
      })
      console.error(e)
    })
  }
}