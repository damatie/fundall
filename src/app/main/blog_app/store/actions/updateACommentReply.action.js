import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const UPDATE_A_COMMENT_REPLY_ERROR = 'UPDATE_A_COMMENT_REPLY_ERROR';
export const UPDATE_A_COMMENT_REPLY_SUCCESS = 'UPDATE_A_COMMENT_REPLY_SUCCESS';
export const UPDATE_A_COMMENT_REPLY_LOADING = 'UPDATE_A_COMMENT_REPLY_LOADING';

const header = fetchHeaders();

export function updateACommentReply({id, content, commentId}) {
	return dispatch => {
		dispatch({
			type: UPDATE_A_COMMENT_REPLY_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/comment/reply/update/${id}`, {
			...header.reqHeader(
				'PATCH',
				{content}
			)
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					console.log(comment)
					return dispatch({
						type: UPDATE_A_COMMENT_REPLY_SUCCESS,
						payload: {id, content, commentId}
					});
				} else {
					console.log(comment);
					return dispatch({
						type: UPDATE_A_COMMENT_REPLY_ERROR,
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
				type: UPDATE_A_COMMENT_REPLY_ERROR,
				payload: error
			});
		});
	}
}