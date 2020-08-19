import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { handleResponse } from 'app/auth/handleRes';

export const GET_LEAVE_OPTIONS = 'GET LEAVE OPTIONS';
export const SET_LEAVE_OPTIONS_SEARCH_TEXT = 'SET LEAVE OPTIONS SEARCH TEXT';
export const LOADING_LEAVE_OPTIONS = 'LOADING LEAVE OPTIONS';

const headers = fetchHeaders();

export function getLeaveOptions() {
	return dispatch => {
    dispatch({
      type: LOADING_LEAVE_OPTIONS
    });
    fetch(`${getBaseUrl()}/leave/manage/`, {
      ...headers.getRegHeader()
    }).then(res => handleResponse(res)).then(
      data => {
        if(data.success) {
          dispatch({
            type: GET_LEAVE_OPTIONS,
            payload: data.data
          })
        } else {
          dispatch({
            type: GET_LEAVE_OPTIONS,
            payload: []
          })
        }
      }
    ).catch(e => console.error(e))
  }
}

export function setLeaveOptionsSearchText(event) {
	return {
		type: SET_LEAVE_OPTIONS_SEARCH_TEXT,
		searchText: event.target.value
	};
}