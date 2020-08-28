import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';

export const GET_DISCIPLINARY_CASE = 'GET DISCIPLINARY CASE';
export const LOADING_DISCIPLINARY_CASE = 'LOADING DISCIPLINARY CASE';
export const CREATE_DISCIPLINARY_CASE_SUCCESS = 'CREATE DISCIPLINARY CASE SUCCESS';
export const CREATE_DISCIPLINARY_CASE_ERROR = 'CREATE DISCIPLINARY CASE ERROR';
export const UPDATE_DISCIPLINARY_CASE_SUCCESS = 'UPDATE DISCIPLINARY CASE SUCCESS';
export const UPDATE_DISCIPLINARY_CASE_ERROR = 'UPDATE DISCIPLINARY CASE ERROR';
export const DELETE_DISCIPLINARY_CASE_SUCCESS = 'DELETE DISCIPLINARY CASE SUCCESS';
export const DELETE_DISCIPLINARY_CASE_ERROR = 'DELETE DISCIPLINARY CASE ERROR';
export const CLOSE_DISCIPLINARY_CASE_SUCCESS = 'CLOSE DISCIPLINARY CASE SUCCESS';
export const CLOSE_DISCIPLINARY_CASE_ERROR = 'CLOSE DISCIPLINARY CASE ERROR';
const auth = useAuth;
const basUrl = getBaseUrl;
const headers = fetchHeaders();

export function getDisciplinaryCase() {
	return dispatch => {
		dispatch({
			type: LOADING_DISCIPLINARY_CASE
		});
		fetch(`${basUrl()}/disciplinary/`, { ...headers.getRegHeader() })
			.then(res => res.json())
			.then(async data => {
				console.log(data.data);
				data.success
					? data.data
						? dispatch({
								type: GET_DISCIPLINARY_CASE,
								payload: data.data
						  })
						: dispatch({
								type: GET_DISCIPLINARY_CASE,
								payload: []
						  })
					: dispatch({
							type: GET_DISCIPLINARY_CASE,
							payload: []
					  });
			})
			.catch(err => {
				console.log(err);
				dispatch({
					type: GET_DISCIPLINARY_CASE,
					payload: []
				});
			});
	};
}

export function createDisciplinaryCase(model) {
	swal.fire('Processing ...');
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_DISCIPLINARY_CASE
		});
		fetch(`${basUrl()}/disciplinary/`, { ...headers.reqHeader('post', model) })
			.then(res => res.json())
			.then(async data => {
				console.log(data);
				if (data.success) {
					swal.fire({
						title: 'Create Disciplinary Case',
						text: data.message,
						timer: 3000,
						icon: 'success'
					});
					Promise.all([
						dispatch({
							type: CREATE_DISCIPLINARY_CASE_SUCCESS
						})
					]).then(() => {
						dispatch(getDisciplinaryCase());
					});
				} else {
					swal.fire({
						title: 'Create Disciplinary Case',
						text: data.error ? data.error : data.message,
						timer: 3000,
						icon: 'error'
					});
					dispatch({
						type: CREATE_DISCIPLINARY_CASE_ERROR
					});
				}
			})
			.catch(e => {
				console.error(e);
				swal.fire({
					title: 'Create Disciplinary Case',
					text: 'Oops! an error occurred. Kindly check network and try again',
					timer: 3000,
					icon: 'error'
				});
				dispatch({
					type: CREATE_DISCIPLINARY_CASE_ERROR
				});
			});
	};
}

export function updateDisciplinaryCase(model, id) {
	console.log(id);
	console.log(model);
	swal.fire('Processing ...');
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_DISCIPLINARY_CASE
		});
		fetch(`${basUrl()}/disciplinary/${id}`, { ...headers.reqHeader('PATCH', model) })
			.then(res => res.json())
			.then(async data => {
				// let data = response.data;
				if (data.success) {
					swal.fire({
						title: 'Update Create Disciplinary Case',
						text: data.message,
						timer: 3000,
						icon: 'success'
					});
					Promise.all([
						dispatch({
							type: UPDATE_DISCIPLINARY_CASE_SUCCESS
						})
					]).then(() => {
						dispatch(getDisciplinaryCase());
					});
				} else {
					swal.fire({
						title: 'Update Create Disciplinary Case',
						text: data.error ? data.error : data.message,
						timer: 3000,
						icon: 'error'
					});
					dispatch({
						type: UPDATE_DISCIPLINARY_CASE_ERROR
					});
				}
			})
			.catch(e => {
				console.error(e);
				swal.fire({
					title: 'Update Create Disciplinary Case',
					text: 'Oops! an error occurred. Kindly check network and try again',
					timer: 3000,
					icon: 'error'
				});
				dispatch({
					type: UPDATE_DISCIPLINARY_CASE_ERROR
				});
			});
	};
}

export function deleteDisciplinaryCase(id) {
	swal.fire('Processing ...');
	swal.showLoading();
	// console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_DISCIPLINARY_CASE
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
				fetch(`${basUrl()}/disciplinary/${id}`, { ...headers.delHeader() })
					.then(res => res.json())
					.then(async data => {
						if (data.success) {
							swal.fire('Deleted!', 'Your case has been deleted.', 'success');

							Promise.all([
								dispatch({
									type: DELETE_DISCIPLINARY_CASE_SUCCESS
								})
							]).then(() => {
								dispatch(getDisciplinaryCase());
							});
						} else {
							swal.fire('Deleted!', data.error ? data.error : data.message, 'error');
							return dispatch({
								type: DELETE_DISCIPLINARY_CASE_ERROR
							});
						}
					})
					.catch(e => {
						console.log(e);
						swal.fire('Oops!', 'something went wrong', 'error');
						return dispatch({
							type: DELETE_DISCIPLINARY_CASE_ERROR
						});
					})
			]
		});
	};
}

export function closeDisciplinaryCase(id) {
	swal.fire('Processing ...');
	swal.showLoading();
	// console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_DISCIPLINARY_CASE
		});
		swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, close it!',
			showLoaderOnConfirm: true,
			preConfirm: () => [
				fetch(`${basUrl()}/disciplinary/${id}`, { ...headers.reqHeader('PUT', '') })
					.then(res => res.json())
					.then(async data => {
						if (data.success) {
							swal.fire('Closes!', 'Your case has been closed.', 'success');

							Promise.all([
								dispatch({
									type: CLOSE_DISCIPLINARY_CASE_SUCCESS
								})
							]).then(() => {
								dispatch(getDisciplinaryCase());
							});
						} else {
							swal.fire('Close!', data.error ? data.error : data.message, 'error');
							return dispatch({
								type: CLOSE_DISCIPLINARY_CASE_ERROR
							});
						}
					})
					.catch(e => {
						console.log(e);
						swal.fire('Oops!', 'something went wrong', 'error');
						return dispatch({
							type: CLOSE_DISCIPLINARY_CASE_ERROR
						});
					})
			]
		});
	};
}
