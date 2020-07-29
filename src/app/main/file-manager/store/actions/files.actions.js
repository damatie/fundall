import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { useBaseUrl } from 'app/hooks/useBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const GET_FILES = 'GET FILES';
export const LOADING_FILES = 'LOADING FILES';
export const UPDATE_FILES = 'UPDATE FILES';
export const CREATE_FILE_SUCCESS = 'CREATE FILE_SUCCESS';
export const CREATE_FILE_ERROR = 'CREATE FILE_ERROR';
export const SET_FILE_SEARCH_TEXT = 'SET FILE SEARCH TEXT';
const auth = useAuth;
const basUrl = useBaseUrl;
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
      ).then(res => res.json()).then( data => {
		// let data = response.data;
		console.log(data)
		if(data.success) {
		  swal.fire({
			title: 'Create Document',
			text: data.message,
			timer: 3000,
			icon: 'success'
		  })
		  getFiles();
		  dispatch({
			type: CREATE_FILE_SUCCESS
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
      ).then(res => res.json()).then( data => {
		// let data = response.data;
		console.log(data)
		if(data.success) {
		  swal.fire({
			title: 'Create Document',
			text: data.message,
			timer: 3000,
			icon: 'success'
		  })
		  getFiles();
		  dispatch({
			type: CREATE_FILE_SUCCESS
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

export function getFiles() {
	const request = axios.get(`${basUrl()}/library/all-docs`,{
        headers: {
          Authorization: `JWT ${auth().getToken}`
        }
      });

	return dispatch =>{
		swal.fire("Processing ...");
		swal.showLoading();
		dispatch({
			type: LOADING_FILES
		  })
		request.then(response => {
			swal.hideLoading();
			swal.close();
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

// function getFileSize(url) {
// 	const request = axios.get(url);

// 	return request.then(response => {
// 			response.headers.
// 		}
// 	}
// }

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
		  fetch(`${basUrl()}/library/delete-one/${id}`, {...headers.delHeader('patch')})
		  .then(res => res.json()).then(
			data => {
			  if(data.success) {
				done = true;
				console.log(data);
				swal.fire(
				  'Deleted!',
				  'Your file has been deleted.',
				  'success'
				)
				return dispatch({
				  type: UPDATE_FILES
				})
			  } else {
				swal.fire(
				  'Deleted!',
				  'something went wrong',
				  'error'
				)
			  }
			}
		  ).catch(e => {
			  console.log(e);
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

export function downloadDocument(url, name){
	fetch( url, 'get' )
	.then((response) => response.blob())
	  .then((blob) => {
		const url = window.URL.createObjectURL(new Blob([blob]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', name);
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	});
}
