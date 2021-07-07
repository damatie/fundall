import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';

export const GET_ENTITIES = 'GET ENTITIES';
export const SET_ENTITIES_SEARCH_TEXT = 'SET ENTITIES SEARCH TEXT';
export const REMOVE_ENTITY = 'REMOVE ENTITY';

export function getEntities() {

	return dispatch => {
      const request = axios.get(`${getBaseUrl()}/entity/all`, {
        headers: {
          Authorization: `JWT ${useAuth().getToken}`
        }
      });
    //   // console.log('Entities request: ', request);
      request.then(res => {
        dispatch({
          type: GET_ENTITIES,
          payload: res.data.data
        })
      })
  }
};

export function setEntitiesSearchText(event) {
	return {
		type: SET_ENTITIES_SEARCH_TEXT,
		searchText: event.target.value
	};
};