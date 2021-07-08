import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';
import moment from 'moment';
import { fetchHeaders } from 'app/shared/fetchHeaders';

export const LOADING_ANSWER = 'LOADING ANSWER';
export const GET_ANSWER = 'GET ANSWER';
export const CREATE_ANSWER_SUCCESS = 'CREATE ANSWER_SUCCESS';
export const CREATE_ANSWER_ERROR = 'CREATE ANSWER_ERROR';
export const UPDATE_ANSWER_SUCCESS = 'UPDATE ANSWER_SUCCESS';
export const UPDATE_ANSWER_ERROR = 'UPDATE ANSWER_ERROR';
export const DELETE_ANSWER_SUCCESS = 'DELETE ANSWER_SUCCESS';
export const DELETE_ANSWER_ERROR = 'DELETE ANSWER_ERROR';
export const APPROVE_ANSWER_SUCCESS = 'APPROVE ANSWER_SUCCESS';
export const APPROVE_ANSWER_ERROR = 'APPROVE ANSWER_ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function getAllPendingAnswers() {
	return dispatch => {
		dispatch({
			type: LOADING_ANSWER
		});
		fetch(`${basUrl()}/answers`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_ANSWER,
						payload: data.data
					})
				:
					dispatch({
						type: GET_ANSWER,
						payload: []
					})
			:
				dispatch({
					type: GET_ANSWER,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_ANSWER,
				payload: []
			})
		})
    }
}

export function getAllApprovedAnswers(id = 0) {
	return dispatch => {
		dispatch({
			type: LOADING_ANSWER
		});
		fetch(`${basUrl()}/answers/all/${id}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_ANSWER,
						payload: data.data
					})
				:
					dispatch({
						type: GET_ANSWER,
						payload: []
					})
			:
				dispatch({
					type: GET_ANSWER,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_ANSWER,
				payload: []
			})
		})
    }
}

export function createAnswer(model) {
	// console.log(model);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_ANSWER
		})
		fetch(`${basUrl()}/answers`, { ...headers.reqHeader('POST', model) }
		).then(res => res.json()).then(async data => {
			// let data = response.data;
			if (data.success) {
				dispatch({
					type: CREATE_ANSWER_SUCCESS
				})
				swal.fire({
					title: 'Create Answer',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				}).then(
				function(){
				  window.location.href = "/training/personal";
				});
			} else {
				swal.fire({
					title: 'Create Answer',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_ANSWER_ERROR
				})
			}
		}).catch(e => {
			console.error(e);
			swal.fire({
				title: 'Create Answer',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: CREATE_ANSWER_ERROR
			})
		})
	}
}

export function updateAnswer(model, id) {
	return dispatch => {
		dispatch({
		  type: LOADING_ANSWER
		})
		
		swal.fire({
		  title: 'Update Answer',
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
			    console.log(data);
				if(data.success) {
				  swal.fire({
					title: 'Update Answer',
					text: data.message,
					timer: 3000,
					icon: 'success'
				  })
				  Promise.all([
					dispatch({
						type: UPDATE_ANSWER_SUCCESS
						})
					]).then(() => {
						dispatch(getAllPendingAnswers())
					})
				} else {
				  swal.fire({
					title: 'Update Answer',
					text: data.error,
					timer: 3000,
					icon: 'error'
				  })
				  dispatch({
					type: UPDATE_ANSWER_ERROR
				  })
				}
			  }).catch(e => {
				console.error(e);
				swal.fire({
					title: 'Update Answer',
					text: 'Oops! an error occurred. Kindly check network and try again',
					timer: 3000,
					icon: 'error'
				  })
				dispatch({
				  type: UPDATE_ANSWER_ERROR
				})
			  })
		  },
		  allowOutsideClick: () => !swal.isLoading()
		})
	  }
}

export function deleteAnswer(id) {
	console.log(id);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {

		dispatch({
			type: LOADING_ANSWER
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
							'APPROVED!',
							'Answer has been approved.',
							'success'
						)
						Promise.all([
							dispatch({
								type: DELETE_ANSWER_SUCCESS
							})
						]).then(() => {
							dispatch(getAllPendingAnswers())
						})
					} else {
						swal.fire(
							'APPROVED!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: DELETE_ANSWER_ERROR
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
						type: DELETE_ANSWER_ERROR
					})
				})
			]
		})
	}
}

export function approveAnswer(id) {
	console.log(id);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {

		dispatch({
			type: LOADING_ANSWER
		});

		swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, approve it!',
			showLoaderOnConfirm: true,
			preConfirm: () => [
				fetch(`${basUrl()}/answers/approve/${id}`, { ...headers.delHeader() })
				.then(res => res.json()).then(async data => {
					if (data.success) {
						swal.fire(
							'APPROVED!',
							'Answer has been approved.',
							'success'
						)
						Promise.all([
							dispatch({
								type: APPROVE_ANSWER_SUCCESS
							})
						]).then(() => {
							dispatch(getAllPendingAnswers())
						})
					} else {
						swal.fire(
							'APPROVED!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: APPROVE_ANSWER_ERROR
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
						type: APPROVE_ANSWER_ERROR
					})
				})
			]
		})
	}
}
