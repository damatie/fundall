import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';
import moment from 'moment';
import { fetchHeaders } from 'app/shared/fetchHeaders';

export const LOADING_QUESTION = 'LOADING QUESTION';
export const GET_QUESTION = 'GET QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE QUESTION_SUCCESS';
export const CREATE_QUESTION_ERROR = 'CREATE QUESTION_ERROR';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE QUESTION_SUCCESS';
export const UPDATE_QUESTION_ERROR = 'UPDATE QUESTION_ERROR';
export const DELETE_QUESTION_SUCCESS = 'DELETE QUESTION_SUCCESS';
export const DELETE_QUESTION_ERROR = 'DELETE QUESTION_ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function getAllQuestions(id = 0) {
	return dispatch => {
		dispatch({
			type: LOADING_QUESTION
		});
		fetch(`${basUrl()}/question/checklist/${id}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			// console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_QUESTION,
						payload: data.data
					})
				:
					dispatch({
						type: GET_QUESTION,
						payload: []
					})
			:
				dispatch({
					type: GET_QUESTION,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_QUESTION,
				payload: []
			})
		})
    }
}

export function createQuestion(model) {
	// // console.log(model);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_QUESTION
		})
		fetch(`${basUrl()}/question`, { ...headers.reqHeader('POST', model) }
		).then(res => res.json()).then(async data => {
			// let data = response.data;
			if (data.success) {
				Promise.all([
					dispatch({
						type: CREATE_QUESTION_SUCCESS
					})
				]).then(() => {
					dispatch(getAllQuestions(model.checkListId))
				})
				swal.fire({
					title: 'Create Question',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				}).then(
				function(){
				//   window.location.href = "/training/personal";
				});
			} else {
				swal.fire({
					title: 'Create Question',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_QUESTION_ERROR
				})
			}
		}).catch(e => {
			console.error(e);
			swal.fire({
				title: 'Create Question',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: CREATE_QUESTION_ERROR
			})
		})
	}
}

export function updateQuestion(model, id) {
	return dispatch => {
		dispatch({
		  type: LOADING_QUESTION
		})
		
		swal.fire({
		  title: 'Update Question',
		  input: 'text',
		  inputValue: model.question,
		  inputAttributes: {
			autocapitalize: 'off'
		  },
		  showCancelButton: true,
		  confirmButtonText: 'Edit',
		  showLoaderOnConfirm: true,
		  preConfirm: (name) => {
		  model.question = name;
          return fetch(`${basUrl()}/question/${id}`, {...headers.reqHeader('PATCH', model)} )
          .then(res => res.json()).then(async data => {
				// let data = response.data;
			    // console.log(data);
				if(data.success) {
				  swal.fire({
					title: 'Update Question',
					text: data.message,
					timer: 3000,
					icon: 'success'
				  })
				  Promise.all([
					dispatch({
						type: UPDATE_QUESTION_SUCCESS
						})
					]).then(() => {
						dispatch(getAllQuestions(model.checkListId))
					})
				} else {
				  swal.fire({
					title: 'Update Question',
					text: data.error,
					timer: 3000,
					icon: 'error'
				  })
				  dispatch({
					type: UPDATE_QUESTION_ERROR
				  })
				}
			  }).catch(e => {
				console.error(e);
				swal.fire({
					title: 'Update Question',
					text: 'Oops! an error occurred. Kindly check network and try again',
					timer: 3000,
					icon: 'error'
				  })
				dispatch({
				  type: UPDATE_QUESTION_ERROR
				})
			  })
		  },
		  allowOutsideClick: () => !swal.isLoading()
		})
	  }
}

export function deleteQuestion(id, checkListId) {
	// console.log(id);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {

		dispatch({
			type: LOADING_QUESTION
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
				fetch(`${basUrl()}/question/${id}`, { ...headers.delHeader() })
				.then(res => res.json()).then(async data => {
					if (data.success) {
						swal.fire(
							'DELETED!',
							'Question has been deleted.',
							'success'
						)
						Promise.all([
							dispatch({
								type: DELETE_QUESTION_SUCCESS
							})
						]).then(() => {
							dispatch(getAllQuestions(checkListId))
						})
					} else {
						swal.fire(
							'DELETED!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: DELETE_QUESTION_ERROR
						})
					}
				}
				).catch(e => {
					console.error(e);
					swal.fire(
						'Oops!',
						'something went wrong',
						'error'
					)
					return dispatch({
						type: DELETE_QUESTION_ERROR
					})
				})
			]
		})
	}
}
