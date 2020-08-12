import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';

export const UPDATE_A_COMMENT_REPLY_ERROR = 'UPDATE_A_COMMENT_REPLY_ERROR';
export const UPDATE_A_COMMENT_REPLY_SUCCESS = 'UPDATE_A_COMMENT_REPLY_SUCCESS';
export const UPDATE_A_COMMENT_REPLY_LOADING = 'UPDATE_A_COMMENT_REPLY_LOADING';

const header = fetchHeaders();

export function updateACommentReply({replyId, content, commentId}) {
	return dispatch => {
		dispatch({
			type: UPDATE_A_COMMENT_REPLY_LOADING
		})
		fetch(`${getBaseUrl()}/comment/reply/update/${replyId}`, {
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
						payload: {replyId, content, commentId}
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
				title: 'UPDATE TO COMMENT REPLY WAS NOT SUCCESSFUL',
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