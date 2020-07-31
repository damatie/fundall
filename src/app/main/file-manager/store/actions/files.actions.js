import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const GET_FILES = 'GET FILES';
export const LOADING_FILES = 'LOADING FILES';
export const CREATE_FILE_SUCCESS = 'CREATE FILE_SUCCESS';
export const CREATE_FILE_ERROR = 'CREATE FILE_ERROR';
export const UPDATE_FILE_SUCCESS = 'UPDATE FILE_SUCCESS';
export const UPDATE_FILE_ERROR = 'UPDATE FILE_ERROR';
export const DELETE_FILE_SUCCESS = 'DELETE FILE_SUCCESS';
export const DELETE_FILE_ERROR = 'DELETE FILE_ERROR';
export const SET_FILE_SEARCH_TEXT = 'SET FILE SEARCH TEXT';
const auth = useAuth;
const basUrl = getBaseUrl;
const headers = fetchHeaders();

  export function createDocument (model, file){
	let payload = new FormData();
	payload.append('docName', model.docName);
	payload.append('category', model.docType);
	payload.append('anydoc', file.file);
	const auth = useAuth;
	return dispatch => {
	swal.fire("Processing ...");
	swal.showLoading();
	  dispatch({
		type: LOADING_FILES
	  })
	  fetch(`${basUrl()}/library/new-doc`, {...headers.fdHeader('post', payload)}
      ).then(res => res.json()).then( async data => {
		// let data = response.data;
		// console.log(data)
		if(data.success) {
		  dispatch({
			type: CREATE_FILE_SUCCESS,
			payload: await getFile()
		  })
		  swal.fire({
			title: 'Create Document',
			text: data.message,
			timer: 3000,
			icon: 'success'
		  })
		} else {
		  swal.fire({
			title: 'Create Document',
			text: data.error,
			timer: 3000,
			icon: 'error'
		  })
		  dispatch({
			type: CREATE_FILE_ERROR
		  })
		}
	  }).catch(e => {
		console.error(e);
		swal.fire({
			title: 'Create Document',
			text: 'Oops! an error occurred. Kindly check network and try again',
			timer: 3000,
			icon: 'error'
		  })
		dispatch({
		  type: CREATE_FILE_ERROR
		})
	  })
	}
  };

  export function updateDocument (model, id){
	return dispatch => {
	swal.fire("Processing ...");
	swal.showLoading();
	  dispatch({
		type: LOADING_FILES
	  })
	  fetch(`${basUrl()}/library/update-doc/${id}`, {...headers.reqHeader('patch', model)}
      ).then(res => res.json()).then(async data => {
		// let data = response.data;
		if(data.success) {
		  dispatch({
			type: UPDATE_FILE_SUCCESS,
			payload: await getFile()
		  })
		  swal.fire({
			title: 'Update Document',
			text: data.message,
			timer: 3000,
			icon: 'success'
		  })
		} else {
		  swal.fire({
			title: 'Update Document',
			text: data.error,
			timer: 3000,
			icon: 'error'
		  })
		  dispatch({
			type: UPDATE_FILE_ERROR
		  })
		}
	  }).catch(e => {
		console.error(e);
		swal.fire({
			title: 'Create Document',
			text: 'Oops! an error occurred. Kindly check network and try again',
			timer: 3000,
			icon: 'error'
		  })
		dispatch({
		  type: UPDATE_FILE_ERROR
		})
	  })
	}
  };

export function getFiles() {
	const request = axios.get(`${basUrl()}/library/all-docs`,{
        headers: {
          Authorization: `JWT ${auth().getToken}`
        }
      });

	return dispatch =>{
		dispatch({
			type: LOADING_FILES
		  })
		request.then(response => {
			response.data.success ? 
          dispatch({
            type: GET_FILES,
            payload: response.data.data
		  })
		
          :
          dispatch({
            type: GET_FILES,
            payload: {

            }
          })
		}).catch(err => {
			console.log(err);
			swal.fire(
                'Oops!',
                'something went wrong',
                'error'
              )
		});
	}
}

export function getFileById(id) {
	const request = axios.get(`${basUrl()}/library/doc-one/${id}`,{
        headers: {
          Authorization: `JWT ${auth().getToken}`
        }
      });

	return dispatch =>{
		dispatch({
			type: LOADING_FILES
		  })
		request.then(response => {
			response.data.success ? 
          dispatch({
            type: GET_FILES,
            payload: response.data.data
          })
          
          :
          dispatch({
            type: GET_FILES,
            payload: {

            }
          })
		}).catch(err => {
			console.log(err);
			swal.fire(
                'Oops!',
                'something went wrong',
                'error'
              )
		});
	}
}


export function deleteDocument(id){
	console.log(id);
	let done = false;
	return dispatch => {
		
		dispatch({
			type: LOADING_FILES
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
		  fetch(`${basUrl()}/library/delete-one/${id}`, {...headers.delHeader()})
		  .then(res => res.json()).then(async data => {
			  if(data.success) {
				done = true;
				return dispatch({
				  type: DELETE_FILE_SUCCESS,
				  payload: await getFile()
				})
				swal.fire(
				  'Deleted!',
				  'Your file has been deleted.',
				  'success'
				)
			  } else {
				return dispatch({
					type: DELETE_FILE_ERROR
				  })
				swal.fire(
				  'Deleted!',
				  'something went wrong',
				  'error'
				)
			  }
			}
		  ).catch(e => {
			  console.log(e);
			  return dispatch({
				  type: DELETE_FILE_ERROR
				})
			swal.fire(
			'Oops!',
			'something went wrong',
			'error'
			)
		})
		  ]
	  })
	}
	
  }
  
  export function setFileSearchText(event) {
	return {
		type: SET_FILE_SEARCH_TEXT,
		searchText: event.target.value
	};
};

export function getFile() {
	const request = axios.get(`${basUrl()}/library/all-docs`,{
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

