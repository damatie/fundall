import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders'

export const GET_CATEGORIES = 'GET COURSE CATEGORIES';
export const LOADING_CATEGORIES = 'LOADING COURSE CATEGORIES';
export const CREATE_COURSE_SUCCESS = 'CREATE COURSE CATEGORIES SUCCESS';
export const CREATE_COURSE_ERROR = 'CREATE COURSE CATEGORIES ERROR';
export const DELETE_COURSE_SUCCESS = 'DELETE COURSE CATEGORIES SUCCESS';
export const DELETE_COURSE_ERROR = 'DELETE COURSE CATEGORIES ERROR';
export const GET_ENTITIES = "GET ENTITIES"
export const GET_DEPARTMENTS = "GET DEPARTMENTS"
export const GET_ROLES = "GET ROLES"

const basUrl = getBaseUrl;
const headers = fetchHeaders();

export function getCategories() {
	return dispatch => {
		dispatch({
			type: LOADING_CATEGORIES
		});
		fetch(`${basUrl()}/training/category`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
				// // console.log(data.data);
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
				// // // console.log(data.data);
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
				// // console.log(err);
			})
	}
}

export function getDepartments(id) {
	return dispatch => {
		fetch(`${basUrl()}/department/all/${id}`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(data => {
				// // // console.log(data.data);
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
				// // console.log(err);
			})
	}
}

export function getRoles() {
	return dispatch => {
		fetch(`${basUrl()}/roles`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
				// // // console.log(data.data);
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
				// // console.log(err);
			})
	}
}

export function addCategory(payload) {
	return dispatch => {
		dispatch({
			type: LOADING_CATEGORIES
		});
		fetch(`${basUrl()}/training/category`, { ...headers.reqHeader('post', payload) })
			.then(res => res.json()).then(async data => {
				if (data.success) {
					dispatch({
						type: CREATE_COURSE_SUCCESS,
						payload: await getCategory()
					})
					swal.fire({
						title: 'Create Course Category',
						text: data.message,
						timer: 3000,
						icon: 'success'
					})
				} else {
					swal.fire({
						title: 'Create Course Category',
						text: data.message,
						timer: 3000,
						icon: 'error'
					})
					dispatch({
						type: CREATE_COURSE_ERROR
					})
				}
			})
			.catch(e => {
				// console.error(e);
				swal.fire({
					title: 'Create Document',
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
export function updateCategory(payload, id) {
	// // console.log(payload)
	return dispatch => {
		dispatch({
			type: LOADING_CATEGORIES
		});
		fetch(`${basUrl()}/training/category/${id}`, { ...headers.reqHeader('PATCH', payload) })
			.then(res => res.json()).then(async data => {
				if (data.success) {
					dispatch({
						type: CREATE_COURSE_SUCCESS,
						payload: await getCategory()
					})
					swal.fire({
						title: 'Create Course Category',
						text: data.message,
						timer: 3000,
						icon: 'success'
					})
				} else {
					swal.fire({
						title: 'Create Course Category',
						text: data.error,
						timer: 3000,
						icon: 'error'
					})
					dispatch({
						type: CREATE_COURSE_ERROR
					})
				}
			})
			.catch(e => {
				// console.error(e);
				swal.fire({
					title: 'Create Document',
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

export function deleteCategory(id) {
	// // console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_CATEGORIES
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
				fetch(`${basUrl()}/training/category/${id}`, { ...headers.delHeader() })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							swal.fire(
								'Deleted!',
								'Your category has been deleted.',
								'success'
							);
							return dispatch({
								type: DELETE_COURSE_SUCCESS,
								payload: await getCategory()
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
						// console.log(e);
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

function getCategory() {
	return fetch(`${basUrl()}/training/category`, { ...headers.getRegHeader() })
		.then(res => res.json()).then(async data => {
			return data.success ? data.data : [];
		}).catch(err => {
			return [];
		});

}
