import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';

export const GETONEBLOGPOST_ERROR = 'GETONEBLOGPOST_ERROR';
export const GETONEBLOGPOST_SUCCESS = 'GETONEBLOGPOST_SUCCESS';
export const GETONEBLOGPOST_LOADING = 'GETONEBLOGPOST_LOADING';

const header = fetchHeaders();

export function getOneBlogPost(id) {
	return dispatch => {
		dispatch({
			type: GETONEBLOGPOST_LOADING
		})
		fetch(`${getBaseUrl()}/posts/${id}`, {
			...header.getRegHeader()
		}).then(res => res.json()).then(
			post => {
				console.log(post);
				if(post.message === 'Success') {
					return dispatch({
						type: GETONEBLOGPOST_SUCCESS,
						payload: post.data
					});
				} else {
					return dispatch({
						type: GETONEBLOGPOST_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			return dispatch({
				type: GETONEBLOGPOST_ERROR,
				payload: error
			});
		});
	}
}

export function autoGetOneBlogPost(id) {
	return dispatch => {
		fetch(`${getBaseUrl()}/posts/${id}`, {
			...header.getRegHeader()
		}).then(res => res.json()).then(
			post => {
				if(post.message === 'Success') {
					return dispatch({
						type: GETONEBLOGPOST_SUCCESS,
						payload: post.data
					});
				} else {
					return dispatch({
						type: GETONEBLOGPOST_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			return dispatch({
				type: GETONEBLOGPOST_ERROR,
				payload: error
			});
		});
	}
}