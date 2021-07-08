import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';
export const BlogPost_ERROR = 'BlogPost_ERROR';
export const BlogPost_SUCCESS = 'BlogPost_SUCCESS';
export const BlogPost_LOADING = 'BlogPost_LOADING';

const header = fetchHeaders();

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export function submitBlogPost(formdata, history) {
	return dispatch => {
		dispatch({
			type: BlogPost_LOADING
		})
		for (var pair of formdata.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
		fetch(`${getBaseUrl()}/posts/`, {
			...header.fdHeader(
				'POST',
				formdata
			)
		}).then(res => res.json()).then(
			post => {
				if(post.message === 'Created!') {
					history.push(`/blog/blog_detail/${post.data.id}`)
					Toast.fire({
            icon: 'success',
            title: 'Blog post was successfull'
          })
					return dispatch({
						type: BlogPost_SUCCESS
					});
				} else {
					console.log(post);
					Toast.fire({
            icon: 'success',
            title: 'Failed to post blog'
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
