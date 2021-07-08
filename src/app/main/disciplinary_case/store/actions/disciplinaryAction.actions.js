import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getDisciplinaryCase } from './disciplinaryCase.actions';

export const GET_DISCIPLINARY_ACTION = 'GET DISCIPLINARY ACTION';
export const LOADING_DISCIPLINARY_ACTION = 'LOADING DISCIPLINARY ACTION';
export const CREATE_DISCIPLINARY_ACTION_SUCCESS = 'CREATE DISCIPLINARY ACTION SUCCESS';
export const CREATE_DISCIPLINARY_ACTION_ERROR = 'CREATE DISCIPLINARY ACTION ERROR';
export const UPDATE_DISCIPLINARY_ACTION_SUCCESS = 'UPDATE DISCIPLINARY ACTION SUCCESS';
export const UPDATE_DISCIPLINARY_ACTION_ERROR = 'UPDATE DISCIPLINARY ACTION ERROR';
export const DELETE_DISCIPLINARY_ACTION_SUCCESS = 'DELETE DISCIPLINARY ACTION SUCCESS';
export const DELETE_DISCIPLINARY_ACTION_ERROR = 'DELETE DISCIPLINARY ACTION ERROR';
const auth = useAuth;
const basUrl = getBaseUrl;
const headers = fetchHeaders();

export function getDisciplinaryAction(id = 1) {
	return dispatch => {
		console.log(id);
		dispatch({
			type: LOADING_DISCIPLINARY_ACTION
		});
		fetch(`${basUrl()}/disciplinary/action/${id}`, { ...headers.getRegHeader() })
			.then(res => res.json())
			.then(async data => {
				console.log(data.data);
				data.success
					? data.data
						? dispatch({
								type: GET_DISCIPLINARY_ACTION,
								payload: data.data
						  })
						: dispatch({
								type: GET_DISCIPLINARY_ACTION,
								payload: []
						  })
					: dispatch({
							type: GET_DISCIPLINARY_ACTION,
							payload: []
					  });
			})
			.catch(err => {
				console.log(err);
				dispatch({
					type: GET_DISCIPLINARY_ACTION,
					payload: []
				});
			});
	};
}

export function createDisciplinaryAction(model) {
	swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_DISCIPLINARY_ACTION
		});
		fetch(`${basUrl()}/disciplinary/action/`, { ...headers.reqHeader('post', model) })
			.then(res => res.json())
			.then(async data => {
				console.log(data);
				if (data.success) {
					swal.fire({
						title: 'Create Disciplinary Action',
						text: data.message,
						timer: 3000,
						icon: 'success'
					});
					Promise.all([
						dispatch({
							type: CREATE_DISCIPLINARY_ACTION_SUCCESS
						})
					]).then(() => {
						dispatch(getDisciplinaryAction(model.disciplinaryCaseId));
						dispatch(getDisciplinaryCase());
					});
				} else {
					swal.fire({
						title: 'Create Disciplinary Action',
						text: data.error ? data.error : data.message,
						timer: 3000,
						icon: 'error'
					});
					dispatch({
						type: CREATE_DISCIPLINARY_ACTION_ERROR
					});
				}
			})
			.catch(e => {
				console.error(e);
				swal.fire({
					title: 'Create Disciplinary Action',
					text: 'Oops! an error occurred. Kindly check network and try again',
					timer: 3000,
					icon: 'error'
				});
				dispatch({
					type: CREATE_DISCIPLINARY_ACTION_ERROR
				});
			});
	};
}

export function updateDisciplinaryAction(model, id) {
	console.log(id);
	console.log(model);
	swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_DISCIPLINARY_ACTION
		});
		fetch(`${basUrl()}/disciplinary/action/${id}`, { ...headers.reqHeader('PATCH', model) })
			.then(res => res.json())
			.then(async data => {
				// let data = response.data;
				if (data.success) {
					swal.fire({
						title: 'Update Create Disciplinary Action',
						text: data.message,
						timer: 3000,
						icon: 'success'
					});
					Promise.all([
						dispatch({
							type: UPDATE_DISCIPLINARY_ACTION_SUCCESS
						})
					]).then(() => {
						dispatch(getDisciplinaryAction(model.disciplinaryCaseId));
						dispatch(getDisciplinaryCase());
					});
				} else {
					swal.fire({
						title: 'Update Create Disciplinary Action',
						text: data.error ? data.error : data.message,
						timer: 3000,
						icon: 'error'
					});
					dispatch({
						type: UPDATE_DISCIPLINARY_ACTION_ERROR
					});
				}
			})
			.catch(e => {
				console.error(e);
				swal.fire({
					title: 'Update Create Disciplinary Action',
					text: 'Oops! an error occurred. Kindly check network and try again',
					timer: 3000,
					icon: 'error'
				});
				dispatch({
					type: UPDATE_DISCIPLINARY_ACTION_ERROR
				});
			});
	};
}

export function deleteDisciplinaryAction(id, disciplinaryCaseId) {
	// console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_DISCIPLINARY_ACTION
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
				fetch(`${basUrl()}/disciplinary/action/${id}`, { ...headers.delHeader() })
					.then(res => res.json())
					.then(async data => {
						if (data.success) {
							swal.fire('Deleted!', 'Your case has been deleted.', 'success');

							Promise.all([
								dispatch({
									type: DELETE_DISCIPLINARY_ACTION_SUCCESS
								})
							]).then(() => {
								dispatch(getDisciplinaryAction(disciplinaryCaseId));
								dispatch(getDisciplinaryCase());
							});
						} else {
							swal.fire('Deleted!', data.error ? data.error : data.message, 'error');
							return dispatch({
								type: DELETE_DISCIPLINARY_ACTION_ERROR
							});
						}
					})
					.catch(e => {
						console.log(e);
						swal.fire('Oops!', 'something went wrong', 'error');
						return dispatch({
							type: DELETE_DISCIPLINARY_ACTION_ERROR
						});
					})
			]
		});
	};
}
