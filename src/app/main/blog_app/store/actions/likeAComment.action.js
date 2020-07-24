import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const LIKE_A_COMMENT_ERROR = 'COMMENTTOPOST_ERROR';
export const LIKE_A_COMMENT_SUCCESS = 'COMMENTTOPOST_SUCCESS';
export const LIKE_A_COMMENT_LOADING = 'COMMENTTOPOST_LOADING';

const header = fetchHeaders();

export function submitBlogComment(data) {
	return dispatch => {
		dispatch({
			type: LIKE_A_COMMENT_LOADING
		})
		fetch('https://hris-cbit.herokuapp.com/api/v1/comment/likes/new', {
			...header.reqHeader(
				'POST',
				data
			)
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					console.log(comment)
					return dispatch({
						type: LIKE_A_COMMENT_SUCCESS
					});
				} else {
					console.log(comment);
					return dispatch({
						type: LIKE_A_COMMENT_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			Swal.fire({
				title: 'COMMENT TO POST',
				text: 'Service unavailable',
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: LIKE_A_COMMENT_ERROR,
				payload: error
			});
		});
	}
}