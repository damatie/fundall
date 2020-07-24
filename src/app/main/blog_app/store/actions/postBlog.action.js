import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';

export const BlogPost_ERROR = 'BlogPost_ERROR';
export const BlogPost_SUCCESS = 'BlogPost_SUCCESS';
export const BlogPost_LOADING = 'BlogPost_LOADING';


const header = fetchHeaders();

export function submitBlogPost(data) {
	return dispatch => {
		dispatch({
			type: BlogPost_LOADING
		})
		fetch('https://hris-cbit.herokuapp.com/api/v1/posts/', {
			...header.reqHeader(
				'POST',
				data
			)
		}).then(res => res.json()).then(
			post => {
				if(post.message === 'Created!') {
					console.log(post)
					Swal.fire({
						title: 'Blog Post was sucessful',
						text: post.message,
						icon: 'success',
						timer: 3000,
					});
					return dispatch({
						type: BlogPost_SUCCESS
					});
				} else {
					console.log(post);
					Swal.fire({
						title: 'BlogPost',
						text: post.message,
						icon: 'error',
						timer: 3000,
					})
					return dispatch({
						type: BlogPost_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			Swal.fire({
				title: 'BlogPost',
				text: 'Service unavailable',
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: BlogPost_ERROR,
				payload: error
			});
		});
	}
}
