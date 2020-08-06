import { fetchHeaders } from 'app/shared/fetchHeaders';
import { autoGetAllCommentsForAPost } from './getAllCommentsForAPost.action';
import { autoGetOneBlogPost } from './getOneBlogPost.action';

export const LIKE_A_COMMENT_ERROR = 'COMMENTTOPOST_ERROR';
export const LIKE_A_COMMENT_SUCCESS = 'COMMENTTOPOST_SUCCESS';
export const LIKE_A_COMMENT_LOADING = 'COMMENTTOPOST_LOADING';

const header = fetchHeaders();

export function likeAComment(id, userId, postId) {
	console.log(postId)
	return dispatch => {
		dispatch({
			type: LIKE_A_COMMENT_LOADING
		})
		fetch('https://hris-cbit.herokuapp.com/api/v1/comment/likes/new', {
			...header.reqHeader(
				'POST',
			{commentId: id}
			)
		}).then(res => res.json()).then(
			comment => {
				console.log(comment)
				if(comment.success === true) {
					// return dispatch({
					// 	type: LIKE_A_COMMENT_SUCCESS,
					// 	payload: {commentId: id, userId}
					// });
					dispatch(autoGetAllCommentsForAPost(postId))
					dispatch(autoGetOneBlogPost(postId))
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
      console.log(error)
			return dispatch({
				type: LIKE_A_COMMENT_ERROR,
				payload: error
			});
		});
	}
}