import { fetchHeaders } from 'app/shared/fetchHeaders';

export const DELETE_ONE_BLOGPOST_ERROR = 'DELETE_ONE_BLOGPOST_ERROR';
export const DELETE_ONE_BLOGPOST_SUCCESS = 'DELETE_ONE_BLOGPOST_SUCCESS';
export const DELETE_ONE_BLOGPOST_LOADING = 'DELETE_ONE_BLOGPOST_LOADING';

const header = fetchHeaders();

export function deleteOneBlogPost(id) {
	return dispatch => {
		dispatch({
			type: DELETE_ONE_BLOGPOST_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/posts/${id}`, {
			...header.delHeader()
		}).then(res => res.json()).then(
			post => {
				if(post.message === "Record deleted") {
					console.log(post);
					return dispatch({
						type: DELETE_ONE_BLOGPOST_SUCCESS,
						payload: id
					});
				} else {
					console.log(post);
					return dispatch({
						type: DELETE_ONE_BLOGPOST_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			console.log(error);
			return dispatch({
				type: DELETE_ONE_BLOGPOST_ERROR,
				payload: error
			});
		});
	}
}