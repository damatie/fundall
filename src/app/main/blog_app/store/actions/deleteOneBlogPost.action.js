import { fetchHeaders } from 'app/shared/fetchHeaders';

export const DELETEONEBLOGPOST_ERROR = 'DELETEONEBLOGPOST_ERROR';
export const DELETEONEBLOGPOST_SUCCESS = 'DELETEONEBLOGPOST_SUCCESS';
export const DELETEONEBLOGPOST_LOADING = 'DELETEONEBLOGPOST_LOADING';

const header = fetchHeaders();

export function deleteOneBlogPost(id) {
	return dispatch => {
		dispatch({
			type: DELETEONEBLOGPOST_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/posts/${id}`, {
			...header.delHeader()
		}).then(res => res.json()).then(
			post => {
				if(post.message === "Record deleted") {
					return dispatch({
						type: DELETEONEBLOGPOST_SUCCESS,
						payload: id
					});
				} else {
					return dispatch({
						type: DELETEONEBLOGPOST_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			return dispatch({
				type: DELETEONEBLOGPOST_ERROR,
				payload: error
			});
		});
	}
}