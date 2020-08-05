import { fetchHeaders } from 'app/shared/fetchHeaders';

export const LIKE_A_COMMENT_ERROR = 'COMMENTTOPOST_ERROR';
export const LIKE_A_COMMENT_SUCCESS = 'COMMENTTOPOST_SUCCESS';
export const LIKE_A_COMMENT_LOADING = 'COMMENTTOPOST_LOADING';

const header = fetchHeaders();

export function likeAComment(id, userId) {
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
				if(comment.success === true) {
					console.log(comment)
					// return dispatch({
					// 	type: LIKE_A_COMMENT_SUCCESS,
					// 	payload: {commentId: id, userId}
					// });
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