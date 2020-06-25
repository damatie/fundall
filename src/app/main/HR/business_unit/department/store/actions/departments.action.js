import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';

export const GET_DEPARTMENTS = 'GET DEPARTMENTS';
export const SET_DEPARTMENTS_SEARCH_TEXT = 'SET DEPARTMENTS SEARCH TEXT';

export function getDepartments(id) {

	return dispatch => {
      const request = axios.get(`https://hris-cbit.herokuapp.com/api/v1/department/all/${id}`, {
        headers: {
          Authorization: `JWT ${useAuth().getToken}`
        }
      });
      request.then(res => {
        dispatch({
          type: GET_DEPARTMENTS,
          payload: res.data.data
        })
      })
  }
}

export function setDepartment(event) {
	return {
		type: SET_DEPARTMENTS_SEARCH_TEXT,
		searchText: event.target.value
	};
}