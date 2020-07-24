import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const EDIT_COMMENT_REPLY_ERROR = 'EDIT_COMMENT_REPLY_ERROR';
export const EDIT_COMMENT_REPLY_SUCCESS = 'EDIT_COMMENT_REPLY_SUCCESS';
export const EDIT_COMMENT_REPLY_LOADING = 'EDIT_COMMENT_REPLY_LOADING';

const header = fetchHeaders();

export function submitBlogComment(data) {
	return dispatch => {
		dispatch({
			type: EDIT_COMMENT_REPLY_LOADING
		})
		fetch('https://hris-cbit.herokuapp.com/api/v1/comment/reply/update/:id', {
			...header.reqHeader(
				'PATCH',
				data
			)
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					console.log(comment)
					return dispatch({
						type: EDIT_COMMENT_REPLY_SUCCESS
					});
				} else {
					console.log(comment);
					return dispatch({
						type: EDIT_COMMENT_REPLY_ERROR,
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
				type: EDIT_COMMENT_REPLY_ERROR,
				payload: error
			});
		});
	}
}