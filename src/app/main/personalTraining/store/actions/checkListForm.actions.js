import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';
import moment from 'moment';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import { amber, blue, orange, blueGrey, lightGreen, green, grey, red } from '@material-ui/core/colors';

export const LOADING_FORM = 'LOADING FORM';
export const GET_FORM = 'GET FORM';
export const CREATE_FORM_SUCCESS = 'CREATE FORM_SUCCESS';
export const CREATE_FORM_ERROR = 'CREATE FORM_ERROR';
export const UPDATE_FORM_SUCCESS = 'UPDATE FORM_SUCCESS';
export const UPDATE_FORM_ERROR = 'UPDATE FORM_ERROR';
export const DELETE_FORM_SUCCESS = 'DELETE FORM_SUCCESS';
export const DELETE_FORM_ERROR = 'DELETE FORM_ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function getAllQuestions(id = 1) {
	return dispatch => {
		dispatch({
			type: LOADING_FORM
		});
		fetch(`${basUrl()}/question/checklist/${id}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_FORM,
						payload: data.data
					})
				:
					dispatch({
						type: GET_FORM,
						payload: []
					})
			:
				dispatch({
					type: GET_FORM,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_FORM,
				payload: []
			})
		})
    }
}

// export function createTraining(model) {
// 	// console.log(model);
// 	swal.fire("Processing ...");
// 	swal.showLoading();
// 	return dispatch => {
// 		dispatch({
// 			type: LOADING_FORM
// 		})
// 		fetch(`${basUrl()}/training/`, { ...headers.reqHeader('POST', model) }
// 		).then(res => res.json()).then(async data => {
// 			// let data = response.data;
// 			if (data.success) {
// 				Promise.all([
// 					dispatch({
// 						type: CREATE_FORM_SUCCESS
// 					})
// 				]).then(() => {
// 					dispatch(getAllTrainings())
// 				})
// 				swal.fire({
// 					title: 'Create Training',
// 					text: (data.message) ? data.message : data.error,
// 					timer: 3000,
// 					icon: 'success'
// 				}).then(
// 				function(){
// 				  window.location.href = "/training/personal";
// 				});
// 			} else {
// 				swal.fire({
// 					title: 'Create Training',
// 					text: (data.message) ? data.message : data.error,
// 					timer: 3000,
// 					icon: 'error'
// 				})
// 				dispatch({
// 					type: CREATE_FORM_ERROR
// 				})
// 			}
// 		}).catch(e => {
// 			console.error(e);
// 			swal.fire({
// 				title: 'Create Training',
// 				text: 'Oops! an error occurred. Kindly check network and try again',
// 				timer: 3000,
// 				icon: 'error'
// 			})
// 			dispatch({
// 				type: CREATE_FORM_ERROR
// 			})
// 		})
// 	}
// }

// export function updateTraining(model, id) {
// 	console.log(id);
// 	console.log(model);
// 	swal.fire("Processing ...");
// 	swal.showLoading();
// 	return dispatch => {
// 		dispatch({
// 			type: LOADING_FORM
// 		})
// 		fetch(`${basUrl()}/training/${id}`, { ...headers.reqHeader('PATCH', model) }
// 		).then(res => res.json()).then(async data => {
// 			// let data = response.data;
// 			if (data.success) {
// 				//   dispatch({
// 				// 	type: UPDATE_FORM_SUCCESS,
// 				// 	payload: response.data,
// 				// 	events: response.events,
// 				// 	trainings: response.trainings
// 				//   })
// 				Promise.all([
// 					dispatch({
// 						type: UPDATE_FORM_SUCCESS
// 					})
// 				]).then(() => dispatch(getAllTrainings()))
// 				swal.fire({
// 					title: 'Update Training Request',
// 					text: (data.message) ? data.message : data.error,
// 					timer: 3000,
// 					icon: 'success'
// 				})
// 			} else {
// 				swal.fire({
// 					title: 'Update Training Request',
// 					text: (data.message) ? data.message : data.error,
// 					timer: 3000,
// 					icon: 'error'
// 				})
// 				dispatch({
// 					type: UPDATE_FORM_ERROR
// 				})
// 			}
// 		}).catch(e => {
// 			console.error(e);
// 			swal.fire({
// 				title: 'Update Training Request',
// 				text: 'Oops! an error occurred. Kindly check network and try again',
// 				timer: 3000,
// 				icon: 'error'
// 			})
// 			dispatch({
// 				type: UPDATE_FORM_ERROR
// 			})
// 		})
// 	}
// }

// export function deleteTrainingRequest(id) {
// 	console.log(id);
// 	return dispatch => {

// 		dispatch({
// 			type: LOADING_FORM
// 		});

// 		swal.fire({
// 			title: 'Are you sure?',
// 			text: "You won't be able to revert this!",
// 			icon: 'warning',
// 			showCancelButton: true,
// 			confirmButtonColor: '#3085d6',
// 			cancelButtonColor: '#d33',
// 			confirmButtonText: 'Yes, delete it!',
// 			showLoaderOnConfirm: true,
// 			preConfirm: () => [
// 				fetch(`${basUrl()}/training/${id}`, { ...headers.delHeader() })
// 					.then(res => res.json()).then(async data => {
// 						if (data.success) {
// 							swal.fire(
// 								'DELETE!',
// 								'Training request has been deleted.',
// 								'success'
// 							)
// 							Promise.all([
// 								dispatch({
// 									type: DELETE_FORM_SUCCESS
// 								})
// 							]).then(() => {
// 								dispatch(getAllTrainings())
// 							})
// 						} else {
// 							swal.fire(
// 								'Deleted!',
// 								'something went wrong',
// 								'error'
// 							)
// 							return dispatch({
// 								type: DELETE_FORM_ERROR
// 							})
// 						}
// 					}
// 					).catch(e => {
// 						console.error(e);
// 						swal.fire(
// 							'Oops!',
// 							'something went wrong',
// 							'error'
// 						)
// 						return dispatch({
// 							type: DELETE_FORM_ERROR
// 						})
// 					})
// 			]
// 		})
// 	}

// }
