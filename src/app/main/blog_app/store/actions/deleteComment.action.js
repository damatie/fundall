import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';

export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_LOADING = 'DELETE_COMMENT_LOADING';

const header = fetchHeaders();

export function deleteComment(id) {
	return dispatch => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			if (result.value) {
				dispatch({
					type: DELETE_COMMENT_LOADING
				})
				fetch(`https://hris-cbit.herokuapp.com/api/v1/comment/one/${id}`, {
					...header.delHeader()
				}).then(res => res.json()).then(
					comment => {
						if(comment.success === true) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
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
				})
			}
		  })
	}
}