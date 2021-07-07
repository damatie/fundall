import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';

export const GETBLOGS_ERROR = 'GETBLOGS_ERROR';
export const GETBLOGS_SUCCESS = 'GETBLOGS_SUCCESS';
export const GETBLOGS_LOADING = 'GETBLOGS_LOADING';

const header = fetchHeaders();

export function getBlogPost(auto) {
	return dispatch => {
		if(!auto) {
			dispatch({
				type: GETBLOGS_LOADING
			})
		}
		
		// fetch(`${getBaseUrl()}/posts/all/paginate?limit=10&offset=0`, {
		fetch(`${getBaseUrl()}/posts/`, {
			...header.getRegHeader()
		}).then(res => res.json()).then(
			post => {
				if(post.message === 'Success') {
					// console.log(post)
					return dispatch({
						type: GETBLOGS_SUCCESS,
						payload: post.data
					});
				} else {
					// console.log(post)
					return dispatch({
						type: GETBLOGS_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			console.log(error)
			return dispatch({
				type: GETBLOGS_ERROR,
				payload: error
			});
		});
	}
}

export function getBlogByLimit(limit = 10, offest = 0){
	return dispatch => {
		// fetch('https://hris-cbit.herokuapp.com/api/v1/posts/all/paginate?limit=10&offset=0', {
		fetch(`${getBaseUrl()}/posts/all/paginate?limit=${limit}&offset=${offest}`, { ...header.getRegHeader()
		}).then(res => res.json()).then(
			post => {
					// console.log(post);
				if(post.message === 'Success') {
					return dispatch({
						type: GETBLOGS_SUCCESS,
						payload: post.data
					});
				} else {
					// console.log(post)
					return dispatch({
						type: GETBLOGS_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			console.log(error)
			return dispatch({
				type: GETBLOGS_ERROR,
				payload: error
			});
		});
	}
}