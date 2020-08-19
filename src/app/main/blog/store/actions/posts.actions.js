import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const GET_POSTS = 'GET POSTS';
export const GET_ONE_POST = 'GET ONE POST';
export const LOADING_POSTS = 'LOADING POSTS';
export const CREATE_POST_SUCCESS = 'CREATE POST SUCCESS';
export const CREATE_POST_ERROR = 'CREATE POST ERROR';
export const UPDATE_POST_SUCCESS = 'UPDATE POST SUCCESS';
export const UPDATE_POST_ERROR = 'UPDATE POST ERROR';
export const LIKE_OR_UNLIKE_POST_SUCCESS = 'LIKE OR UNLIKE POST SUCCESS';
export const LIKE_OR_UNLIKE_POST_ERROR = 'LIKE OR UNLIKE POST ERROR';
export const DELETE_POST_SUCCESS = 'DELETE POST SUCCESS';
export const DELETE_POST_ERROR = 'DELETE POST ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
export function getPosts(limit = 10, offset= 0) {
	return dispatch => {
		dispatch({
			type: LOADING_POSTS
		});
		fetch(`${basUrl()}/posts/all/paginate?limit=${limit}&offset=${offset}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data);
			data.message === 'Success' ? 
				(data.data) ?
					dispatch({
						type: GET_POSTS,
						payload: data.data
					})
				:
					dispatch({
						type: GET_POSTS,
						payload: []
					})
			:
				dispatch({
					type: GET_POSTS,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_POSTS,
				payload: []
			})
		})
	}
}

export function getPostById(id){
	console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_POSTS
		});
		fetch(`${basUrl()}/posts/${id}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data);
			data.message === 'Success' ? 
				(data.data) ?
					dispatch({
						type: GET_ONE_POST,
						payload: data.data
					})
				:
					dispatch({
						type: GET_ONE_POST,
						payload: []
					})
			:
				dispatch({
					type: GET_ONE_POST,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_ONE_POST,
				payload: []
			})
		})
	}
}

export function createPost(payload){
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_POSTS
		})
		for (var pair of payload.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}
		fetch(`${basUrl()}/posts/`, { ...headers.fdHeader('POST', payload) }
		).then(res => res.json()).then(async data => {
			console.log(data);
			if (data.success || data.message === 'Created!') {
				Promise.all([
					dispatch({
						type: CREATE_POST_SUCCESS
					})
				]).then(() => {
					dispatch(getPosts())
				});
				swal.fire({
					title: 'Create Blog Post',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				}).then(function(){
				  window.location.href = "/main/blogs";
				});
			} else {
				swal.fire({
					title: 'Create Blog Post',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_POST_ERROR
				})
			}
		}).catch(e => {
			console.error(e);
			swal.fire({
				title: 'Create Blog Post',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: CREATE_POST_ERROR
			})
		})
	}
}

export function updatePost(payload, id){
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_POSTS
		})
		for (var pair of payload.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}
		fetch(`${basUrl()}/posts/${id}`, { ...headers.fdHeader('PUT', payload) }
		).then(res => res.json()).then(async data => {
			console.log(data);
			if (data.success || data.message === 'Updated!') {
				Promise.all([
					dispatch({
						type: UPDATE_POST_SUCCESS
					})
				]).then(() => {
					dispatch(getPosts())
					dispatch(getPostById(id))
				});
				swal.fire({
					title: 'Update Blog Post',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				}).then(function(){
				  window.location.href = "/main/blogs";
				});
			} else {
				swal.fire({
					title: 'Update Blog Post',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: UPDATE_POST_ERROR
				})
			}
		}).catch(e => {
			console.error(e);
			swal.fire({
				title: 'Update Blog Post',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: UPDATE_POST_ERROR
			})
		})
	}
}

export function likeAndUnlike(postId, employeeId){
	return dispatch => {
		dispatch({
			type: LOADING_POSTS
		})
		fetch(`${basUrl()}/posts/post/like/${postId}`, { ...headers.reqHeader('PATCH', '') }
		).then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				dispatch({
					type: LIKE_OR_UNLIKE_POST_SUCCESS,
					payload: {...data, employeeId}
				})
			} else {
				dispatch({
					type: LIKE_OR_UNLIKE_POST_ERROR
				})
			}
		}).catch(e => {
			console.error(e);
			dispatch({
				type: LIKE_OR_UNLIKE_POST_ERROR
			})
		})
	}
}

export function deletePost(id) {
	console.log(id);
	return dispatch => {

		dispatch({
			type: LOADING_POSTS
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
				fetch(`${basUrl()}/posts/${id}`, { ...headers.delHeader() })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							swal.fire(
								'DELETE!',
								'Post has been deleted.',
								'success'
							)
							Promise.all([
								dispatch({
									type: DELETE_POST_SUCCESS
								})
							]).then(() => {
								dispatch(getPosts())
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: DELETE_POST_ERROR
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
							type: DELETE_POST_ERROR
						})
					})
			]
		})
	}

}


