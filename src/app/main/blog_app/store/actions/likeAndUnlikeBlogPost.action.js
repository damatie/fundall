import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const LIKE_AND_UNLIKE_BLOGPOST_ERROR = 'LIKE_AND_UNLIKE_BLOGPOST_ERROR';
export const LIKE_AND_UNLIKE_BLOGPOST_SUCCESS = 'LIKE_AND_UNLIKE_BLOGPOST_SUCCESS';
export const LIKE_AND_UNLIKE_BLOGPOST_LOADING = 'LIKE_AND_UNLIKE_BLOGPOST_LOADING';


const header = fetchHeaders();

export function likeAndUnlikeBlogPost(id) {
	return dispatch => {
		dispatch({
			type: LIKE_AND_UNLIKE_BLOGPOST_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/posts/post/like/${id}`, {
			...header.reqHeader(
				'PATCH',
			)
		}).then(res => res.json()).then(
			post => {
				if(post.success) {
					console.log(post)
					return dispatch({
						type: LIKE_AND_UNLIKE_BLOGPOST_SUCCESS
					});
				} else {
					console.log(post);
					return dispatch({
						type: LIKE_AND_UNLIKE_BLOGPOST_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			Swal.fire({
				title: 'LIKE_AND_UNLIKE_BLOGPOST',
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
