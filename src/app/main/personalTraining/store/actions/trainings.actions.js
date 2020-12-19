import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';
import moment from 'moment';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import { amber, blue, orange, blueGrey, lightGreen, green, grey, red } from '@material-ui/core/colors';
import { GET_ROLES } from 'app/main/HR/roles/store/actions';

export { GET_ROLES };
export const LOADING_TRAININGS = 'LOADING TRAININGS';
export const GET_TRAININGS = 'GET TRAININGS';

export const PENDING_TRAININGS_HR = "PENDING TRAININGS HR";
export const REVIEWED_TRAININGS_HR = "REVIEWED TRAININGS HR";
export const APPROVED_TRAININGS_HR = "APPROVED TRAININGS HR";
export const COMPLETED_TRAININGS_HR = "COMPLETED TRAININGS HR";
export const REJECTED_TRAININGS_HR = "REJECTED TRAININGS HR";

export const PENDING_TRAININGS_PERSONAL = "PENDING TRAININGS PERSONAL";
export const REVIEWED_TRAININGS_PERSONAL = "REVIEWED TRAININGS PERSONAL";
export const APPROVED_TRAININGS_PERSONAL = "APPROVED TRAININGS PERSONAL";
export const COMPLETED_TRAININGS_PERSONAL = "COMPLETED TRAININGS PERSONAL";
export const REJECTED_TRAININGS_PERSONAL = "REJECTED TRAININGS PERSONAL";

export const LOADING_CATEGORIES = 'LOADING CATEGORIES';
export const GET_CATEGORIES = 'GET COURSE CATEGORIES';
export const GET_ENTITIES = "GET ENTITIES"
export const GET_DEPARTMENTS = "GET DEPARTMENTS"

export const CREATE_TRAINING_SUCCESS = 'CREATE TRAINING_SUCCESS';
export const CREATE_TRAINING_ERROR = 'CREATE TRAINING_ERROR';
export const UPDATE_TRAINING_SUCCESS = 'UPDATE TRAINING_SUCCESS';
export const UPDATE_TRAINING_ERROR = 'UPDATE TRAINING_ERROR';
export const DELETE_TRAINING_SUCCESS = 'DELETE TRAINING_SUCCESS';
export const DELETE_TRAINING_ERROR = 'DELETE TRAINING_ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function getAllTrainings() {
	let trainings = [];
	let events = [];
	let event = {};
	return dispatch => {
		dispatch({
			type: LOADING_TRAININGS
		});
		fetch(`${basUrl()}/training/all/employee/request`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
				// console.log(data.data);
				if (data.success && data.data) {
					//Filter the result to get all trainings
					trainings = data.data.map(d => { return d.training; })
					// console.log(trainings);
					if (trainings) {
						//Format the Trainings to match the events for the Calendar
						events = trainings.map(t => {
							return {
								id: t.id,
								title: t.trainingCourse.name,
								allDay: false,
								start: moment(t.startDate, "DD-MM-YYYY").toDate(),
								end: moment(t.endDate, "DD-MM-YYYY").toDate(),
								course: t.trainingCourse,
								color: (t.status === 'pending') ? blue[500] : (t.status === 'approved') ? lightGreen[500] : (t.status === 'rejected') ? red[500] : (t.status === 'completed') ? green[500] : (t.status === 'reviewed') ? orange[500] : amber[500]
							}
						})
					}
					// console.log(events);
					dispatch({
						type: GET_TRAININGS,
						payload: data.data,
						events: events,
						trainings: trainings
					})
				} else {
					dispatch({
						type: GET_TRAININGS,
						payload: [],
						events: [],
						trainings: []
					})
				}
			}).catch(err => {
				// console.log(err);
				dispatch({
					type: GET_TRAININGS,
					payload: [],
					events: [],
					trainings: []
				})
			})
	}
}

export function createTraining(model, history) {
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_TRAININGS
		})
		fetch(`${basUrl()}/training/courses`, { ...headers.reqHeader('POST', model) }
		).then(res => res.json()).then(async data => {
			// console.log(data)
			// let data = response.data;
			if (data.success) {
				Promise.all([
					dispatch({
						type: CREATE_TRAINING_SUCCESS
					})
				]).then(() => {
					dispatch(getAllTrainings())
				})
				swal.fire({
					title: 'Create Training',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				}).then(
					function () {
						history.push("/training/list");
					});
			} else {
				swal.fire({
					title: 'Create Training',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_TRAINING_ERROR
				})
			}
		}).catch(e => {
			// console.error(e);
			swal.fire({
				title: 'Create Training',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: CREATE_TRAINING_ERROR
			})
		})
	}
}

export function updateTraining(model, id) {
	// console.log(id);
	// console.log(model);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_TRAININGS
		})
		fetch(`${basUrl()}/training/courses/${id}`, { ...headers.reqHeader('PATCH', model) }
		).then(res => res.json()).then(async data => {
			// let data = response.data;
			if (data.success) {
				//   dispatch({
				// 	type: UPDATE_TRAINING_SUCCESS,
				// 	payload: response.data,
				// 	events: response.events,
				// 	trainings: response.trainings
				//   })
				Promise.all([
					dispatch({
						type: UPDATE_TRAINING_SUCCESS
					})
				]).then(() => dispatch(getAllTrainings()))
				swal.fire({
					title: 'Update Training Request',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				})
			} else {
				swal.fire({
					title: 'Update Training Request',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: UPDATE_TRAINING_ERROR
				})
			}
		}).catch(e => {
			// console.error(e);
			swal.fire({
				title: 'Update Training Request',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: UPDATE_TRAINING_ERROR
			})
		})
	}
}

export function deleteTrainingRequest(id) {
	// console.log(id);
	return dispatch => {

		dispatch({
			type: LOADING_TRAININGS
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
				fetch(`${basUrl()}/training/${id}`, { ...headers.delHeader() })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							swal.fire(
								'DELETE!',
								'Training request has been deleted.',
								'success'
							)
							Promise.all([
								dispatch({
									type: DELETE_TRAINING_SUCCESS
								})
							]).then(() => {
								dispatch(getAllTrainings())
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: DELETE_TRAINING_ERROR
							})
						}
					}
					).catch(e => {
						// console.error(e);
						swal.fire(
							'Oops!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: DELETE_TRAINING_ERROR
						})
					})
			]
		})
	}

}

export function cancelTrainingRequest(id) {
	// console.log(id);
	return dispatch => {

		dispatch({
			type: LOADING_TRAININGS
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
				fetch(`${basUrl()}/training/employee/cancel/${id}`, { ...headers.reqHeader(), method: "PATCH" })
					.then(res => res.json()).then(async data => {
						// console.log(data)
						if (data.success) {
							swal.fire(
								'DELETE!',
								'Training request has been deleted.',
								'success'
							)
							Promise.all([
								dispatch({
									type: DELETE_TRAINING_SUCCESS
								})
							]).then(() => {
								dispatch(getAllTrainings())
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: DELETE_TRAINING_ERROR
							})
						}
					}
					).catch(e => {
						// console.error(e);
						swal.fire(
							'Oops!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: DELETE_TRAINING_ERROR
						})
					})
			]
		})
	}

}

export function getTraining() {
	let trainings = [];
	let events = [];
	let event = {};

	const request = axios.get(`${basUrl()}/training/all/employee/request`, {
		headers: {
			Authorization: `JWT ${auth().getToken}`
		}
	});

	return request.then(response => {
		if (response.data.success && response.data.data) {
			trainings = response.data.data.map(d => { return d.training; })
			if (trainings) {
				trainings.forEach(t => {
					event.id = (t.id) ? t.id : 1;
					event.title = t.trainingTraining.name;
					event.allDay = false;
					let start = t.startDate.split('-');
					let end = t.endDate.split('-');
					event.start = new Date(start[2], start[1], start[0], 0, 0, 0);
					event.end = new Date(end[2], end[1], end[0], 0, 0, 0);
					event.course = t.trainingTraining;
					event.color = (t.status === 'pending') ? blue[500] : (t.status === 'approved') ? lightGreen[500] : (t.status === 'rejected') ? red[500] : (t.status === 'completed') ? green[500] : amber[500]
					events.push(event);
				})
			}
			return {
				data: response.data.data,
				events: events,
				trainings: trainings
			}
		} else {
			return {
				data: [],
				events: [],
				trainings: []
			}
		};
	}).catch(err => {
		return {
			data: [],
			events: [],
			trainings: []
		}
	});
}

export function requestTraining(id) {
	swal.fire("Processing ...");
	// console.log(id)
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_TRAININGS
		})
		fetch(`${basUrl()}/training`, { ...headers.reqHeader('POST', { trainingCourseId: id }) }
		).then(res => res.json()).then(async data => {
			// console.log(data);
			if (data.success) {
				swal.fire({
					title: 'Training Request',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				})
			}
			else {
				swal.fire({
					title: 'Training Request',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
			}
		})
	}
}

export function getPendingTrainingPersonal(offset = 0, limit = 20) {

	return dispatch => {

		axios.get(`${basUrl()}/training/all/employee/request?offset=${offset}&limit=${limit}&status=pending`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: PENDING_TRAININGS_PERSONAL,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return [];
		});

	}
}

export function getPendingTrainingHR(offset = 0, limit = 20) {

	return dispatch => {

		axios.get(`${basUrl()}/training/all/dept/pending?offset=${offset}&limit=${limit}`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: PENDING_TRAININGS_HR,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return [];
		});

	}
}

export function getReviewedTrainingPersonal(offset = 0, limit = 20) {

	return dispatch => {

		axios.get(`${basUrl()}/training/all/employee/request?offset=${offset}&limit=${limit}&status=reviewed`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: REVIEWED_TRAININGS_PERSONAL,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return [];
		});

	}
}

export function getReviewedTrainingHR(offset = 0, limit = 20) {

	return dispatch => {

		axios.get(`${basUrl()}/training/all/dept/reviewed?offset=${offset}&limit=${limit}`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: REVIEWED_TRAININGS_HR,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return [];
		});

	}
}

export function getCompletedTrainingPersonal(offset = 0, limit = 20) {

	return dispatch => {
		axios.get(`${basUrl()}/training/all/employee/?offset=${offset}&limit=${limit}&status=completed`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: COMPLETED_TRAININGS_PERSONAL,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return [];
		});
	}
}

export function getCompletedTrainingHR(offset = 0, limit = 20) {

	return dispatch => {
		axios.get(`${basUrl()}/training/all/dept/completed?offset=${offset}&limit=${limit}`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: COMPLETED_TRAININGS_HR,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return [];
		});
	}
}

export function getApprovedTrainingPersonal(offset = 0, limit = 20) {

	return dispatch => {
		axios.get(`${basUrl()}/training/all/employee/request?offset=${offset}&limit=${limit}&status=approved`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: APPROVED_TRAININGS_PERSONAL,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return []
		});
	}
}

export function getApprovedTrainingHR(offset = 0, limit = 20) {

	return dispatch => {
		axios.get(`${basUrl()}/training/all/dept/approved?offset=${offset}&limit=${limit}`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: APPROVED_TRAININGS_HR,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return []
		});
	}
}

export function getRejectedTrainingPersonal(offset = 0, limit = 20) {

	return dispatch => {
		axios.get(`${basUrl()}/training/all/employee/request?offset=${offset}&limit=${limit}&status=rejected`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: REJECTED_TRAININGS_PERSONAL,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return [];
		});
	}
}

export function getRejectedTrainingHR(offset = 0, limit = 20) {

	return dispatch => {
		axios.get(`${basUrl()}/training/all/dept/rejected?offset=${offset}&limit=${limit}`, {
			headers: {
				Authorization: `JWT ${auth().getToken}`
			}
		}).then((res) => {
			dispatch({
				type: REJECTED_TRAININGS_HR,
				payload: res.data.data
			})
		}).catch((err) => {
			// console.log(err.response);
			return [];
		});
	}
}

export function getCategories() {
	return dispatch => {
		dispatch({
			type: LOADING_CATEGORIES
		});
		fetch(`${basUrl()}/training/category`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(data => {
				data.success ?
					dispatch({
						type: GET_CATEGORIES,
						payload: data.data
					})
					:
					dispatch({
						type: GET_CATEGORIES,
						payload: []
					})
			}).catch(err => {
				// console.log(err);
				swal.fire(
					'Oops!',
					'something went wrong',
					'error'
				)
			})
	}
}

export function getEntities() {
	return dispatch => {
		fetch(`${basUrl()}/entity/all`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(data => {
				// console.log(data.data);
				data.success ?
					dispatch({
						type: GET_ENTITIES,
						payload: data.data
					})
					:
					dispatch({
						type: GET_ENTITIES,
						payload: []
					})
			}).catch(err => {
				// console.log(err);
			})
	}
}

export function getDepartments(id) {
	return dispatch => {
		fetch(`${basUrl()}/department/all/${id}`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(data => {
				// console.log(data.data);
				data.success ?
					dispatch({
						type: GET_DEPARTMENTS,
						payload: data.data
					})
					:
					dispatch({
						type: GET_DEPARTMENTS,
						payload: []
					})
			}).catch(err => {
				// console.log(err);
			})
	}
}

export function getRoles() {
	return dispatch => {
		fetch(`${basUrl()}/roles`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
				// console.log(data.data);
				data.success ?
					dispatch({
						type: GET_ROLES,
						payload: data.data
					})
					:
					dispatch({
						type: GET_ROLES,
						payload: []
					})
			}).catch(err => {
				// console.log(err);
			})
	}
}