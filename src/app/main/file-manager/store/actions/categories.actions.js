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
	  fetch(`${basUrl()}/document_category/add_category`, {...headers.reqHeader('post', model)}
      ).then(res => res.json()).then( async data => {
        //   // console.log(data);
		if(data.success) {
		  dispatch({
			type: CREATE_CATEGORY_SUCCESS,
			payload: await getCategory()
		  })
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
        title: 'Edit Document Category',
        // input: 'text',
        // inputValue: model.categoryName,
        // inputAttributes: {
        //   autocapitalize: 'off'
		// },
		html:
      `<input id="swal_cat_name" value="${model.categoryName}" class="swal2-input">
      <input id="swal_cat_desc" value="${model.description}" class="swal2-input">`,
        showCancelButton: true,
        confirmButtonText: 'Edit',
        showLoaderOnConfirm: true,
        preConfirm: () => {
		model.categoryName = document.getElementById('swal_cat_name').value;
		model.description = document.getElementById('swal_cat_desc').value;
		// console.log(model);
        return fetch(`${basUrl()}/document_category/${id}`, {...headers.reqHeader('PATCH', model)}
            ).then(res => res.json()).then(async data => {
              // let data = response.data;
            //   // console.log(data);
              if(data.success) {
                dispatch({
                  type: UPDATE_CATEGORY_SUCCESS,
                  payload: await getCategory()
                })
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
        fetch(`${basUrl()}/document_category`, {...headers.getRegHeader()})
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

export function getFileById(id) {
	return dispatch =>{
		dispatch({
			type: LOADING_CATEGORIES
		  })
        fetch(`${basUrl()}/document_category/${id}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			// // console.log(data.data);
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
	// // console.log(id);
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
		  fetch(`${basUrl()}/document_category/${id}`, {...headers.delHeader()})
		  .then(res => res.json()).then(async data => {
			  if(data.success) {
				swal.fire(
				  'Deleted!',
				  'Your category has been deleted.',
				  'success'
				)
				return dispatch({
				  type: DELETE_CATEGORY_SUCCESS,
				  payload: await getCategory()
				})
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
	const request = axios.get(`${basUrl()}/document_category`,{
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

