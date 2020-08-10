import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const DELETE_COMMENT_REPLY_ERROR = 'COMMENTTOPOST_ERROR';
export const DELETE_COMMENT_REPLY_SUCCESS = 'COMMENTTOPOST_SUCCESS';
export const DELETE_COMMENT_REPLY_LOADING = 'COMMENTTOPOST_LOADING';

const header = fetchHeaders();

export function deleteCommentReply({replyId, commentId}) {
	return dispatch => {
		dispatch({
			type: DELETE_COMMENT_REPLY_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/comment/reply/one/${replyId}`, {
			...header.delHeader()
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					console.log('reply: ', comment)
					return dispatch({
						type: DELETE_COMMENT_REPLY_SUCCESS,
						payload: {replyId, commentId}
					});
				} else {
					console.log(comment);
					return dispatch({
						type: DELETE_COMMENT_REPLY_ERROR,
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
				type: DELETE_COMMENT_REPLY_ERROR,
				payload: error
			});
		});
	}
}