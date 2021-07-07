import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';
import moment from 'moment';
import { fetchHeaders } from 'app/shared/fetchHeaders';

export const LOADING_CHECK_LIST = 'LOADING CHECK_LIST';
export const GET_CHECK_LIST = 'GET CHECK_LIST';
export const CREATE_CHECK_LIST_SUCCESS = 'CREATE CHECK_LIST_SUCCESS';
export const CREATE_CHECK_LIST_ERROR = 'CREATE CHECK_LIST_ERROR';
export const UPDATE_CHECK_LIST_SUCCESS = 'UPDATE CHECK_LIST_SUCCESS';
export const UPDATE_CHECK_LIST_ERROR = 'UPDATE CHECK_LIST_ERROR';
export const DELETE_CHECK_LIST_SUCCESS = 'DELETE CHECK_LIST_SUCCESS';
export const DELETE_CHECK_LIST_ERROR = 'DELETE CHECK_LIST_ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function getAllCheckLists() {
	return dispatch => {
		dispatch({
			type: LOADING_CHECK_LIST
		});
		fetch(`${basUrl()}/checklist/`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
				// // console.log(data);
				data.success ?
					(data.checkLists || data.data) ?
						dispatch({
							type: GET_CHECK_LIST,
							payload: (data.data) ? data.data : data.checkLists
						})
						:
						dispatch({
							type: GET_CHECK_LIST,
							payload: []
						})
					:
					dispatch({
						type: GET_CHECK_LIST,
						payload: []
					})
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_CHECK_LIST,
					payload: []
				})
			})
	}
}

export function createCheckList(model) {
	// // console.log(model);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_CHECK_LIST
		})
		fetch(`${basUrl()}/checklist/`, { ...headers.reqHeader('POST', model) }
		).then(res => res.json()).then(async data => {
			// let data = response.data;
			if (data.success) {
				Promise.all([
					dispatch({
						type: CREATE_CHECK_LIST_SUCCESS
					})
				]).then(() => {
					dispatch(getAllCheckLists())
				})
				swal.fire({
					title: 'Create Check List',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				}).then(
					function () {
						//   window.location.href = "/training/personal";
					});
			} else {
				swal.fire({
					title: 'Create Check List',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_CHECK_LIST_ERROR
				})
			}
		}).catch(e => {
			console.error(e);
			swal.fire({
				title: 'Create Check List',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: CREATE_CHECK_LIST_ERROR
			})
		})
	}
}

export function updateCheckList(model, id) {
	return dispatch => {
		dispatch({
			type: LOADING_CHECK_LIST
		})

		swal.fire({
			title: 'Update Check List',
			input: 'text',
			inputValue: model.type,
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Edit',
			showLoaderOnConfirm: true,
			preConfirm: (name) => {
				model.type = name;
				return fetch(`${basUrl()}/checklist/${id}`, { ...headers.reqHeader('PATCH', model) }
				).then(res => res.json()).then(async data => {
					// let data = response.data;
					// // console.log(data);
					if (data.success) {
						swal.fire({
							title: 'Update Check List',
							text: data.message,
							timer: 3000,
							icon: 'success'
						})
						Promise.all([
							dispatch({
								type: UPDATE_CHECK_LIST_SUCCESS
							})
						]).then(() => {
							dispatch(getAllCheckLists())
						})
					} else {
						swal.fire({
							title: 'Update Check List',
							text: data.error,
							timer: 3000,
							icon: 'error'
						})
						dispatch({
							type: UPDATE_CHECK_LIST_ERROR
						})
					}
				}).catch(e => {
					console.error(e);
					swal.fire({
						title: 'Update Check List',
						text: 'Oops! an error occurred. Kindly check network and try again',
						timer: 3000,
						icon: 'error'
					})
					dispatch({
						type: UPDATE_CHECK_LIST_ERROR
					})
				})
			},
			allowOutsideClick: () => !swal.isLoading()
		})
	}
}

export function deleteCheckList(id) {
	// console.log(id);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {

		dispatch({
			type: LOADING_CHECK_LIST
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
				fetch(`${basUrl()}/checklist/${id}`, { ...headers.delHeader() })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							swal.fire(
								'DELETE!',
								'Check List has been deleted.',
								'success'
							)
							Promise.all([
								dispatch({
									type: DELETE_CHECK_LIST_SUCCESS
								})
							]).then(() => {
								dispatch(getAllCheckLists())
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: DELETE_CHECK_LIST_ERROR
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
							type: DELETE_CHECK_LIST_ERROR
						})
					})
			]
		})
	}
}
