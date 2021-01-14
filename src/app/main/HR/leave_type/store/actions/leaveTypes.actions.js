import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';

export const GET_LEAVE_TYPES = 'GET LEAVE TYPES';
export const SET_LEAVE_TYPES_SEARCH_TEXT = 'SET LEAVE TYPES SEARCH TEXT';

export function getLeaveTypes() {

	return dispatch => {
      const request = axios.get('https://hris-cbit.herokuapp.com/api/v1/leave-type/', {
        headers: {
          Authorization: `JWT ${useAuth().getToken}`
        }
      });
      request.then(res => {
        dispatch({
          type: GET_LEAVE_TYPES,
          payload: res.data.data
        })
      })
  }
}

export function setLeaveTypeSearchText(event) {
	return {
		type: SET_LEAVE_TYPES_SEARCH_TEXT,
		searchText: event.target.value
	};
}