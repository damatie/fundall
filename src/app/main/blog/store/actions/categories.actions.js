import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const GET_CATEGORIES = 'GET CATEGORYS';
export const LOADING_CATEGORIES = 'LOADING CATEGORYS';
export const CREATE_CATEGORY_SUCCESS = 'CREATE CATEGORY_SUCCESS';
export const CREATE_CATEGORY_ERROR = 'CREATE CATEGORY_ERROR';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_ERROR = 'UPDATE CATEGORY_ERROR';
export const DELETE_CATEGORY_SUCCESS = 'DELETE CATEGORY_SUCCESS';
export const DELETE_CATEGORY_ERROR = 'DELETE CATEGORY_ERROR';
export const SET_CATEGORY_SEARCH_TEXT = 'SET CATEGORY SEARCH TEXT';
const auth = useAuth;
const basUrl = getBaseUrl;
const headers = fetchHeaders();

  export function createCategory (model){
	return dispatch => {
	  dispatch({
		type: LOADING_CATEGORIES
	  })
	  fetch(`${basUrl()}/post/category/`, {...headers.reqHeader('post', model)}
      ).then(res => res.json()).then( async data => {
        //   console.log(data);
		if(data.success) {
		  Promise.all([
			dispatch({
				type: CREATE_CATEGORY_SUCCESS
			})
		]).then(() => {
			dispatch(getCategories())
		});
		  swal.fire({
			title: 'Create Category',
			text: data.message,
			timer: 3000,
			icon: 'success'
		  })
		} else {
		  swal.fire({
			title: 'Create Category',
			text: data.error,
			timer: 3000,
			icon: 'error'
		  })
		  dispatch({
			type: CREATE_CATEGORY_ERROR
		  })
		}
	  }).catch(e => {
		console.error(e);
		swal.fire({
			title: 'Create Category',
			text: 'Oops! an error occurred. Kindly check network and try again',
			timer: 3000,
			icon: 'error'
		  })
		dispatch({
		  type: CREATE_CATEGORY_ERROR
		})
	  })
	}
  };

  export function updateCategory(model, id){
	return dispatch => {
	  dispatch({
		type: LOADING_CATEGORIES
	  })
      
      swal.fire({
        title: 'Edit Blog Category',
        input: 'text',
        inputValue: model.categoryName,
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Edit',
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
        model.categoryName = name;
        return fetch(`${basUrl()}/post/category/${id}`, {...headers.reqHeader('PATCH', model)}
            ).then(res => res.json()).then(async data => {
              // let data = response.data;
              console.log(data);
              if(data.success) {
				Promise.all([
					dispatch({
						type: UPDATE_CATEGORY_SUCCESS
					})
				]).then(() => {
					dispatch(getCategories())
				});
                swal.fire({
                  title: 'Update Category',
                  text: data.message,
                  timer: 3000,
                  icon: 'success'
                })
              } else {
                swal.fire({
                  title: 'Update Category',
                  text: data.error,
                  timer: 3000,
                  icon: 'error'
                })
                dispatch({
                  type: UPDATE_CATEGORY_ERROR
                })
              }
            }).catch(e => {
              console.error(e);
              swal.fire({
                  title: 'Create Category',
                  text: 'Oops! an error occurred. Kindly check network and try again',
                  timer: 3000,
                  icon: 'error'
                })
              dispatch({
                type: UPDATE_CATEGORY_ERROR
              })
            })
        },
        allowOutsideClick: () => !swal.isLoading()
      })
	}
  };

export function getCategories() {
	return dispatch =>{
		dispatch({
			type: LOADING_CATEGORIES
		  })
        fetch(`${basUrl()}/post/category/`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_CATEGORIES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_CATEGORIES,
						payload: []
					})
			:
				dispatch({
					type: GET_CATEGORIES,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_CATEGORIES,
				payload: []
			})
		})
	}
}

export function getCategoryById(id) {
	return dispatch =>{
		dispatch({
			type: LOADING_CATEGORIES
		  })
        fetch(`${basUrl()}/post/category/${id}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			// console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_CATEGORIES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_CATEGORIES,
						payload: []
					})
			:
				dispatch({
					type: GET_CATEGORIES,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_CATEGORIES,
				payload: []
			})
		})
	}
}


export function deleteCategory(id){
	// console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_CATEGORIES
		  });
	  swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!',
		showLoaderOnConfirm: true,
		preConfirm: () => [
		  fetch(`${basUrl()}/post/category/${id}`, {...headers.delHeader()})
		  .then(res => res.json()).then(async data => {
			  if(data.success) {
				swal.fire(
				  'Deleted!',
				  'Your category has been deleted.',
				  'success'
				)
				Promise.all([
					dispatch({
						type: DELETE_CATEGORY_SUCCESS
					})
				]).then(() => {
					dispatch(getCategories())
				});
			  } else {
				swal.fire(
				  'Deleted!',
				  'something went wrong',
				  'error'
				)
                return dispatch({
                    type: DELETE_CATEGORY_ERROR
                })
			  }
			}
		  ).catch(e => {
			  console.log(e);
			swal.fire(
			'Oops!',
			'something went wrong',
			'error'
			)
            return dispatch({
                type: DELETE_CATEGORY_ERROR
            })
		})
		  ]
	  })
	}
	
  }
  
  export function setCategorySearchText(event) {
	return {
		type: SET_CATEGORY_SEARCH_TEXT,
		searchText: event.target.value
	};
};

export function getCategory() {
	const request = axios.get(`${basUrl()}/post/category`,{
        headers: {
          Authorization: `JWT ${auth().getToken}`
        }
    });

	return request.then(response => {
		return response.data.success ? response.data.data : [];
	}).catch(err => {
		return []
	});
}

