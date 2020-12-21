import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders'

export const LOADING_ENTITIES = 'LOADING ENTITIES';
export const GET_ENTITIES_SUCCESS = 'GET ENTITIES SUCCESS';
export const GET_ENTITIES_ERROR = 'GET ENTITIES ERROR';

const baseUrl = getBaseUrl;
const headers = fetchHeaders();
// const auth = useAuth;

export function getEntities() {
	return dispatch => {
		dispatch({
			type: LOADING_ENTITIES
		});
		fetch(`${baseUrl()}/entity/all`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
				if (data.success && data.data) {
					dispatch({
						type: GET_ENTITIES_SUCCESS,
						payload: data.data,
					})
				} else {
					dispatch({
						type: GET_ENTITIES_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_ENTITIES_ERROR,
					payload: [],
				})
			})
	}
}
