
import Api from 'app/services/api';



export const GET_DEPARTMENTS = 'GET DEPARTMENTS';
export const SET_DEPARTMENTS_SEARCH_TEXT = 'SET DEPARTMENTS SEARCH TEXT';
export const GET_ONE_DEPARTMENT = 'GET ONE DEPARTMENT';
export const LOADING_DEPARTMENT = 'LOADING DEPARTMENT';

export function getDepartments(id) {

	return async (dispatch) => {
      const {data: {data}} = await Api.get(`department/all/${id}`);
        dispatch({
          type: GET_DEPARTMENTS,
          payload: data
        })
  }
}

export function setDepartment(event) {
	return {
		type: SET_DEPARTMENTS_SEARCH_TEXT,
		searchText: event.target.value
	};
}