import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { autoGetAllCommentsForAPost } from './getAllCommentsForAPost.action';
import { autoGetOneBlogPost } from './getOneBlogPost.action';
// import { redirectUrl } from '../../redirectUrl';

export const COMMENT_TO_POST_ERROR = 'COMMENT_TO_POST_ERROR';
export const COMMENT_TO_POST_SUCCESS = 'COMMENT_TO_POST_SUCCESS';
export const COMMENT_TO_POST_LOADING = 'COMMENT_TO_POST_LOADING';

const header = fetchHeaders();

export function submitBlogComment(data) {
	return dispatch => {
		dispatch({
			type: COMMENT_TO_POST_LOADING
		})
		fetch(`${getBaseUrl()}/comment/new`, {
			...header.reqHeader(
				'post',
				data
			)
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					dispatch(autoGetAllCommentsForAPost(data.postId));
					dispatch(autoGetOneBlogPost(data.postId))
					return dispatch({
						type: COMMENT_TO_POST_SUCCESS,
						payload: comment.data
					});
				} else {
					// console.log(comment);
					return dispatch({
						type: COMMENT_TO_POST_ERROR,
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
				type: COMMENT_TO_POST_ERROR,
				payload: error
			});
		});
	}
}
