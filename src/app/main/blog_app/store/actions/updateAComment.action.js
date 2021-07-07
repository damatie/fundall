import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';

export const UPDATE_A_COMMENT_ERROR = 'UPDATE_A_COMMENT_ERROR';
export const UPDATE_A_COMMENT_SUCCESS = 'UPDATE_A_COMMENT_SUCCESS';
export const UPDATE_A_COMMENT_LOADING = 'UPDATE_A_COMMENT_LOADING';

const header = fetchHeaders();

export function updateAComment({id, content}) {
	return dispatch => {
		dispatch({
			type: UPDATE_A_COMMENT_LOADING
		})
		fetch(`${getBaseUrl()}/comment/update/${id}`, {
			...header.reqHeader(
				'PATCH',
				{content}
			)
		}).then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					// console.log(comment)
					return dispatch({
						type: UPDATE_A_COMMENT_SUCCESS,
						payload: {id, content}
					});
				} else {
					// console.log(comment);
					return dispatch({
						type: UPDATE_A_COMMENT_ERROR,
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
				type: UPDATE_A_COMMENT_ERROR,
				payload: error
			});
		});
	}
}