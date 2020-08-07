import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { autoGetAllCommentsForAPost } from './getAllCommentsForAPost.action';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { submitBlogComment } from './commentToPost.action';
// import { redirectUrl } from '../../redirectUrl';

export const COMMENT_TO_COMMENT_ERROR = 'COMMENTTOPOST_ERROR';
export const COMMENT_TO_COMMENT_SUCCESS = 'COMMENTTOPOST_SUCCESS';
export const COMMENT_TO_COMMENT_LOADING = 'COMMENTTOPOST_LOADING';

const header = fetchHeaders();

export function submitBlogCommentReply(data, id) {
	return dispatch => {
		dispatch({
			type: COMMENT_TO_COMMENT_LOADING
		})
		fetch(`${getBaseUrl()}/comment/reply/new`, {
			...header.reqHeader(
				'POST',
				data
			)
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					// dispatch(autoGetAllCommentsForAPost(id))
					dispatch(submitBlogComment(data.id, true))
					return dispatch({
						type: COMMENT_TO_COMMENT_SUCCESS,
						payload: comment.data
					});
				} else {
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
