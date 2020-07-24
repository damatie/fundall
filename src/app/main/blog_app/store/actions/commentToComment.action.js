import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const COMMENT_TO_COMMENT_ERROR = 'COMMENTTOPOST_ERROR';
export const COMMENT_TO_COMMENT_SUCCESS = 'COMMENTTOPOST_SUCCESS';
export const COMMENT_TO_COMMENT_LOADING = 'COMMENTTOPOST_LOADING';

const header = fetchHeaders();

export function submitBlogCommentReply(data) {
	return dispatch => {
		dispatch({
			type: COMMENT_TO_COMMENT_LOADING
		})
		console.log(data);
		fetch('https://hris-cbit.herokuapp.com/api/v1/comment/reply/new', {
			...header.reqHeader(
				'POST',
				data
			)
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					console.log(comment)
					return dispatch({
						type: COMMENT_TO_COMMENT_SUCCESS
					});
				} else {
					console.log(comment);
					return dispatch({
						type: COMMENT_TO_COMMENT_ERROR,
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
				type: COMMENT_TO_COMMENT_ERROR,
				payload: error
			});
		});
	}
}
