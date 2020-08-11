import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';

export const DELETE_ONE_BLOGPOST_ERROR = 'DELETE_ONE_BLOGPOST_ERROR';
export const DELETE_ONE_BLOGPOST_SUCCESS = 'DELETE_ONE_BLOGPOST_SUCCESS';
export const DELETE_ONE_BLOGPOST_LOADING = 'DELETE_ONE_BLOGPOST_LOADING';

const header = fetchHeaders();

export function deleteOneBlogPost(id) {
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
          type: DELETE_ONE_BLOGPOST_LOADING
        })
        fetch(`https://hris-cbit.herokuapp.com/api/v1/posts/${id}`, {
          ...header.delHeader()
        }).then(res => res.json()).then(
          post => {
            if(post.message === "Record deleted") {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              return dispatch({
                type: DELETE_ONE_BLOGPOST_SUCCESS,
                payload: id
              });
            } else {
              console.log(post);
              return dispatch({
                type: DELETE_ONE_BLOGPOST_ERROR,
                payload: ''
              });
            }
          }
        )
        .catch(error => {
          console.log(error);
          return dispatch({
            type: DELETE_ONE_BLOGPOST_ERROR,
            payload: error
          });
        });
      }
    })
	}
}