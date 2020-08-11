import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';

export const LIKE_AND_UNLIKE_BLOGPOST_ERROR = 'LIKE_AND_UNLIKE_BLOGPOST_ERROR';
export const LIKE_AND_UNLIKE_BLOGPOST_SUCCESS = 'LIKE_AND_UNLIKE_BLOGPOST_SUCCESS';

const header = fetchHeaders();

export function likeAndUnlikeBlogPost({postId, employeeId}) {
	return dispatch => {
		fetch(`${getBaseUrl()}/posts/post/like/${postId}`, {
			...header.reqHeader(
				'PATCH',
			)
		}).then(res => res.json()).then(
			post => {
				if(post.success === true) {
					return dispatch({
						type: LIKE_AND_UNLIKE_BLOGPOST_SUCCESS,
						payload: {...post.result, employeeId}
					});
				} else {
					return dispatch({
						type: LIKE_AND_UNLIKE_BLOGPOST_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			Swal.fire({
				title: 'post TO POST',
				text: 'Service unavailable',
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: LIKE_AND_UNLIKE_BLOGPOST_ERROR,
				payload: error
			});
		});
	}
}
