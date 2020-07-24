import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const GET_REPLY_TO_COMMENT_ERROR = 'GET_REPLY_TO_COMMENT_ERROR';
export const GET_REPLY_TO_COMMENT_SUCCESS = 'GET_REPLY_TO_COMMENT_SUCCESS';
export const GET_REPLY_TO_COMMENT_LOADING = 'GET_REPLY_TO_COMMENT_LOADING';

const header = fetchHeaders();

export function submitBlogComment(id) {
	return dispatch => {
		dispatch({
			type: GET_REPLY_TO_COMMENT_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/comment/reply/one/${id}`, {
			...header.getRegHeader()
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					console.log(comment)
					return dispatch({
						type: GET_REPLY_TO_COMMENT_SUCCESS
					});
				} else {
					console.log(comment);
					return dispatch({
						type: GET_REPLY_TO_COMMENT_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			Swal.fire({
				title: 'REPLY TO POST',
				text: 'Service unavailable',
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: GET_REPLY_TO_COMMENT_ERROR,
				payload: error
			});
		});
	}
}