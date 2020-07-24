import { fetchHeaders } from 'app/shared/fetchHeaders';

export const GETBLOGS_ERROR = 'GETBLOGS_ERROR';
export const GETBLOGS_SUCCESS = 'GETBLOGS_SUCCESS';
export const GETBLOGS_LOADING = 'GETBLOGS_LOADING';

const header = fetchHeaders();

export function getBlogPost() {
	return dispatch => {
		dispatch({
			type: GETBLOGS_LOADING
		})
		fetch('https://hris-cbit.herokuapp.com/api/v1/posts/', {
			...header.getRegHeader()
		}).then(res => res.json()).then(
			post => {
				if(post.message === 'Success') {
					return dispatch({
						type: GETBLOGS_SUCCESS,
						payload: post.data
					});
				} else {
					return dispatch({
						type: GETBLOGS_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			return dispatch({
				type: GETBLOGS_ERROR,
				payload: error
			});
		});
	}
}