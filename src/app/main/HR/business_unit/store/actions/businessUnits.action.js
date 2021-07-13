import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';

export const GET_BUSINESS_UNITS = 'GET BUSINESS_UNITS';
export const SET_BUSINESS_UNITS_SEARCH_TEXT = 'SET BUSINESS_UNITS SEARCH TEXT';
export const REMOVE_ENTITY = 'REMOVE ENTITY';

export function getBusinessUnits() {

	return dispatch => {
      const request = axios.get(`${getBaseUrl()}/entity`, {
        headers: {
          Authorization: `JWT ${useAuth().getToken}`
        }
      });
      request.then(res => {
        dispatch({
          type: GET_BUSINESS_UNITS,
          payload: res.data.data
        })
      })
  }
};

export function setBusinesUnitsSearchText(event) {
	return {
		type: SET_BUSINESS_UNITS_SEARCH_TEXT,
		searchText: event.target.value
	};
};