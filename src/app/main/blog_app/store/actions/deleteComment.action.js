import { fetchHeaders } from 'app/shared/fetchHeaders';

export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_LOADING = 'DELETE_COMMENT_LOADING';

const header = fetchHeaders();

export function deleteComment(id) {
	return dispatch => {
		dispatch({
			type: DELETE_COMMENT_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/comment/one/${id}`, {
			...header.delHeader()
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
          console.log(comment);
					return dispatch({
						type: DELETE_COMMENT_SUCCESS,
						payload: id
					});
				} else {
					return dispatch({
						type: DELETE_COMMENT_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			return dispatch({
				type: DELETE_COMMENT_ERROR,
				payload: error
			});
		});
	}
}