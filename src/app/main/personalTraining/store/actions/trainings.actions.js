import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';
import moment from 'moment';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import { amber, blue, orange, blueGrey, lightGreen, green, grey, red } from '@material-ui/core/colors';

export const LOADING_TRAININGS = 'LOADING TRAININGS';
export const GET_TRAININGS = 'GET TRAININGS';
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
				console.log(data.data);
				if (data.success && data.data) {
					//Filter the result to get all trainings
					trainings = data.data.map(d => { return d.training; })
					console.log(trainings);
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
					console.log(events);
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
				console.log(err);
				dispatch({
					type: GET_TRAININGS,
					payload: [],
					events: [],
					trainings: []
				})
			})
	}
}

export function createTraining(model) {
	// console.log(model);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_TRAININGS
		})
		fetch(`${basUrl()}/training/`, { ...headers.reqHeader('POST', model) }
		).then(res => res.json()).then(async data => {
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
				function(){
				  window.location.href = "/training/personal";
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
			console.error(e);
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
	console.log(id);
	console.log(model);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_TRAININGS
		})
		fetch(`${basUrl()}/training/${id}`, { ...headers.reqHeader('PATCH', model) }
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
			console.error(e);
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
	console.log(id);
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
						console.error(e);
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
