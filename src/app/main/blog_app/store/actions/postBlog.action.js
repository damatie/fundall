import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
// import { redirectUrl } from '../../redirectUrl';
import {getBaseUrl} from 'app/shared/getBaseUrl';

export const BlogPost_ERROR = 'BlogPost_ERROR';
export const BlogPost_SUCCESS = 'BlogPost_SUCCESS';
export const BlogPost_LOADING = 'BlogPost_LOADING';

const header = fetchHeaders();

export function submitBlogPost(formdata) {
	return dispatch => {
		dispatch({
			type: BlogPost_LOADING
		})
		for (var pair of formdata.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
		fetch(`${getBaseUrl()}/posts/`,  { ...header.fdHeader( 'POST', formdata )
		}).then(res => res.json()).then(
			post => {
				if(post.message === 'Created!') {
					console.log(post)
					Swal.fire({
						title: 'Blog Post was sucessful',
						text: post.message,
						icon: 'success',
						timer: 3000,
					}).then(function(){
						window.location = '/blog/list';
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
			console.log(error);
			Swal.fire({
				title: 'Blog post was unsuccessful',
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
