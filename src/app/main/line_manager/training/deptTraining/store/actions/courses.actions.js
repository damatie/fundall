import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const LOADING_COURSES = 'LOADING COURSES';
export const LOADING_COURSE_CATEGORIES = 'LOADING COURSE CATEGORIES';
export const GET_APPROVED_COURSES = 'GET APPROVED COURSES';
export const GET_REJECTED_COURSES = 'GET REJECTED COURSES';
export const GET_PENDING_COURSES = 'GET PENDING COURSES';
export const GET_COURSE_CATEGORIES = 'GET COURSE CATEGORIES';
export const APPROVE_COURSE_SUCCESS = 'APPROVE COURSE SUCCESS';
export const APPROVE_COURSE_ERROR = 'APPROVE COURSE ERROR';
export const REJECT_COURSE_SUCCESS = 'REJECT COURSE SUCCESS';
export const REJECT_COURSE_ERROR = 'REJECT COURSE ERROR';
export const CREATE_COURSE_SUCCESS = 'CREATE COURSE_SUCCESS';
export const CREATE_COURSE_ERROR = 'CREATE COURSE_ERROR';
export const UPDATE_COURSE_SUCCESS = 'UPDATE COURSE_SUCCESS';
export const UPDATE_COURSE_ERROR = 'UPDATE COURSE_ERROR';
export const DELETE_COURSE_SUCCESS = 'DELETE COURSE_SUCCESS';
export const DELETE_COURSE_ERROR = 'DELETE COURSE_ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();

export function getApprovedCourses() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSES
		});
		fetch(`${basUrl()}/training/courses/all/approved`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_APPROVED_COURSES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_APPROVED_COURSES,
						payload: []
					})
			:
				dispatch({
					type: GET_APPROVED_COURSES,
					payload: []
				})
		}).catch(err => {
			console.error(err);
			dispatch({
				type: GET_APPROVED_COURSES,
				payload: []
			})
		})
	}
}

export function getRejectedCourses() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSES
		});
		fetch(`${basUrl()}/training/courses/all/rejected`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_REJECTED_COURSES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_REJECTED_COURSES,
						payload: []
					})
			:
				dispatch({
					type: GET_REJECTED_COURSES,
					payload: []
				})
		}).catch(err => {
			console.error(err);
			dispatch({
				type: GET_REJECTED_COURSES,
				payload: []
			})
		})
	}
}

export function getPendingCourses() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSES
		});
		fetch(`${basUrl()}/training/courses/all/pending`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_PENDING_COURSES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_PENDING_COURSES,
						payload: []
					})
			:
				dispatch({
					type: GET_PENDING_COURSES,
					payload: []
				})
		}).catch(err => {
			console.error(err);
			dispatch({
				type: GET_PENDING_COURSES,
				payload: []
			})
		})
	}
}

export function getCourseCategories() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSE_CATEGORIES
		});
		fetch(`${basUrl()}/training/category`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_COURSE_CATEGORIES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_COURSE_CATEGORIES,
						payload: []
					})
			:
				dispatch({
					type: GET_COURSE_CATEGORIES,
					payload: []
				})
		}).catch(err => {
			console.error(err);
			swal.fire(
                'Oops!',
                'something went wrong',
                'error'
              )
		})
	}
}

export function createCourse(model){
	// console.log(model);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
	  dispatch({
		type: LOADING_COURSES
	  })
	  fetch(`${basUrl()}/training/courses`, {...headers.reqHeader('POST', model)}
      ).then(res => res.json()).then(async data => {
		// let data = response.data;
		if(data.success) {
			Promise.all([
				dispatch({
					type: CREATE_COURSE_SUCCESS
				})
			]).then(() => {
				dispatch(getApprovedCourses())
				dispatch(getRejectedCourses())
				dispatch(getPendingCourses())
			})
		  swal.fire({
			title: 'Create Course',
			text: (data.message) ? data.message : data.error,
			timer: 3000,
			icon: 'success'
		  })
		} else {
		  swal.fire({
			title: 'Create Course',
			text: (data.message) ? data.message : data.error,
			timer: 3000,
			icon: 'error'
		  })
		  dispatch({
			type: CREATE_COURSE_ERROR
		  })
		}
	  }).catch(e => {
		console.error(e);
		swal.fire({
			title: 'Create Course',
			text: 'Oops! an error occurred. Kindly check network and try again',
			timer: 3000,
			icon: 'error'
		  })
		dispatch({
		  type: CREATE_COURSE_ERROR
		})
	  })
	}
}

export function updateCourse(model, id){
	console.log(model);
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
	  dispatch({
		type: LOADING_COURSES
	  })
	  fetch(`${basUrl()}/training/courses/${id}`, {...headers.reqHeader('PATCH', model)}
      ).then(res => res.json()).then(async data => {
		// let data = response.data;
		if(data.success) {
			Promise.all([
				dispatch({
					type: UPDATE_COURSE_SUCCESS
				})
			]).then(() => {
				dispatch(getApprovedCourses())
				dispatch(getRejectedCourses())
				dispatch(getPendingCourses())
			})
		  swal.fire({
			title: 'Create Course',
			text: (data.message) ? data.message : data.error,
			timer: 3000,
			icon: 'success'
		  })
		} else {
		  swal.fire({
			title: 'Create Course',
			text: (data.message) ? data.message : data.error,
			timer: 3000,
			icon: 'error'
		  })
		  dispatch({
			type: UPDATE_COURSE_ERROR
		  })
		}
	  }).catch(e => {
		console.error(e);
		swal.fire({
			title: 'Create Course',
			text: 'Oops! an error occurred. Kindly check network and try again',
			timer: 3000,
			icon: 'error'
		  })
		dispatch({
		  type: UPDATE_COURSE_ERROR
		})
	  })
	}
}

export function approveCourse(id) {
	console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_COURSES
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
				fetch(`${basUrl()}/training/courses/approve/${id}`, { ...headers.reqHeader('PATCH', '') })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							swal.fire(
								'APPROVE!',
								'Course has been approved.',
								'success'
							)
							Promise.all([
								dispatch({
									type: APPROVE_COURSE_SUCCESS
								})
							]).then(() => {
								dispatch(getApprovedCourses())
								dispatch(getRejectedCourses())
								dispatch(getPendingCourses())
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: APPROVE_COURSE_ERROR
							})
						}
					}
					).catch(e => {
						console.log(e);
						swal.fire(
							'Oops!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: APPROVE_COURSE_ERROR
						})
					})
			]
		})
	}

}

export function rejectCourse(id) {
	console.log(id);
	let done = false;
	return dispatch => {

		dispatch({
			type: LOADING_COURSES
		});

		swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, reject it!',
			showLoaderOnConfirm: true,
			preConfirm: () => [
				fetch(`${basUrl()}/training/courses/reject/${id}`, { ...headers.reqHeader('PATCH', '') })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							done = true;
							swal.fire(
								'REJECT!',
								'Course has been rejected.',
								'success'
							)
							Promise.all([
								dispatch({
									type: REJECT_COURSE_SUCCESS
								})
							]).then(() => {
								dispatch(getApprovedCourses())
								dispatch(getRejectedCourses())
								dispatch(getPendingCourses())
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: REJECT_COURSE_ERROR
							})
						}
					}
					).catch(e => {
						console.log(e);
						swal.fire(
							'Oops!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: REJECT_COURSE_ERROR
						})
					})
			]
		})
	}

}

export function deleteCourse(id) {
	console.log(id);
	return dispatch => {

		dispatch({
			type: LOADING_COURSES
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
				fetch(`${basUrl()}/training/courses/${id}`, { ...headers.delHeader() })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							swal.fire(
								'DELETE!',
								'Course has been deleted.',
								'success'
							)
							Promise.all([
								dispatch({
									type: DELETE_COURSE_SUCCESS
								})
							]).then(() => {
								dispatch(getApprovedCourses())
								dispatch(getRejectedCourses())
								dispatch(getPendingCourses())
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: DELETE_COURSE_ERROR
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
							type: DELETE_COURSE_ERROR
						})
					})
			]
		})
	}

}