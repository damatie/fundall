import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const EDITBLOG_ERROR = 'EDITBLOG_ERROR';
export const EDITBLOG_SUCCESS = 'EDITBLOG_SUCCESS';
export const EDITBLOG_LOADING = 'EDITBLOG_LOADING';


const header = fetchHeaders();

export function editBlogPost(data, id) {
	return dispatch => {
		dispatch({
			type: EDITBLOG_LOADING
		})
		fetch(`https://hris-cbit.herokuapp.com/api/v1/posts/${id}`, {
			...header.fdHeader(
				'PUT',
				data
			)
		}).then(res => res.json()).then(
			post => {
				if(post.message === 'Updated!') {
					console.log(post)
					Swal.fire({
						title: 'Blog update was sucessful',
						text: post.message,
						icon: 'success',
						timer: 3000,
					});
					return dispatch({
						type: EDITBLOG_SUCCESS
					});
				} else {
					console.log(post);
					Swal.fire({
						title: 'EDITBLOG',
						text: post.message,
						icon: 'error',
						timer: 3000,
					})
					return dispatch({
						type: EDITBLOG_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			Swal.fire({
				title: 'EDITBLOG',
				text: 'Service unavailable',
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: EDITBLOG_ERROR,
				payload: error
			});
		});
	}
}