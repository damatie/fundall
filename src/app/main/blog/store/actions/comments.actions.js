import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {getPostById} from './posts.actions';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const GET_COMMENTS = 'GET COMMENTS';
export const GET_ONE_COMMENT = 'GET ONE COMMENT';
export const LOADING_COMMENTS = 'LOADING COMMENTS';
export const CREATE_COMMENT_SUCCESS = 'CREATE COMMENT SUCCESS';
export const CREATE_COMMENT_ERROR = 'CREATE COMMENT ERROR';
export const COMMENT_TO_COMMENT_SUCCESS = 'COMMENTTOPOST_SUCCESS';
export const COMMENT_TO_COMMENT_ERROR = 'COMMENTTOPOST_ERROR';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE COMMENT SUCCESS';
export const UPDATE_COMMENT_ERROR = 'UPDATE COMMENT ERROR';
export const UPDATE_COMMENT_REPLY_SUCCESS = 'UPDATE COMMENT REPLY SUCCESS';
export const UPDATE_COMMENT_REPLY_ERROR = 'UPDATE COMMENT REPLY ERROR';
export const LIKE_COMMENT_SUCCESS = 'LIKE COMMENT SUCCESS';
export const LIKE_COMMENT_ERROR = 'LIKE COMMENT ERROR';
export const DELETE_COMMENT_SUCCESS = 'DELETE COMMENT SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE COMMENT ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
export function getPostComments(id) {
	// console.log("get Post Comments: "+id);
	return dispatch => {
		dispatch({
			type: LOADING_COMMENTS
		});
		fetch(`${basUrl()}/comment/all/${id}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data);
			(data.success || data.message === 'Success') ? 
				(data.data) ?
					dispatch({
						type: GET_COMMENTS,
						payload: data.data
					})
				:
					dispatch({
						type: GET_COMMENTS,
						payload: []
					})
			:
				dispatch({
					type: GET_COMMENTS,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_COMMENTS,
				payload: []
			})
		})
	}
}

export function getCommentsById(id){
	return dispatch => {
		dispatch({
			type: LOADING_COMMENTS
		});
		fetch(`${basUrl()}/comment/one/${id}`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data);
			data.message === 'Success' ? 
				(data.data) ?
					dispatch({
						type: GET_ONE_COMMENT,
						payload: data.data
					})
				:
					dispatch({
						type: GET_ONE_COMMENT,
						payload: []
					})
			:
				dispatch({
					type: GET_ONE_COMMENT,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_ONE_COMMENT,
				payload: []
			})
		})
	}
}

export function createComment(payload){
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_COMMENTS
		})
		fetch(`${basUrl()}/comment/new`, { ...headers.reqHeader('POST', payload) }
		).then(res => res.json()).then(async data => {
			// let data = response.data;
			console.log(data);
			if (data.success) {
				Promise.all([
					dispatch({
						type: CREATE_COMMENT_SUCCESS
					})
				]).then(() => {
					dispatch(getPostComments(payload.postId))
					dispatch(getPostById(payload.postId))
				})
				swal.fire({
					title: 'COMMENT TO POST',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				});
			} else {
				swal.fire({
					title: 'Create Blog Post',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_COMMENT_ERROR
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
				type: CREATE_COMMENT_ERROR
			})
		})
	}
}

export function likeAComment(id, userId, postId){
	return dispatch => {
		dispatch({
			type: LOADING_COMMENTS
		})
		fetch(`${basUrl()}/comment/likes/new`, { ...headers.reqHeader('POST', {commentId: id}) }
		).then(res => res.json()).then(async data => {
			// let data = response.data;
			if (data.success) {
				Promise.all([
					dispatch({
						type: LIKE_COMMENT_SUCCESS
					})
				]).then(() => {
					dispatch(getPostComments(postId));
					dispatch(getPostById(postId));
				})
			} else {
				dispatch({
					type: LIKE_COMMENT_ERROR
				})
			}
		}).catch(e => {
			console.error(e);
			swal.fire({
				title: 'LIKE COMMENT',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: LIKE_COMMENT_ERROR
			})
		})
	}
}

export function deleteComment(id, postId) {
	console.log(id);
	return dispatch => {

		dispatch({
			type: LOADING_COMMENTS
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
				fetch(`${basUrl()}/comment/one/${id}`, { ...headers.delHeader() })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							swal.fire(
								'DELETE!',
								'Post has been deleted.',
								'success'
							)
							Promise.all([
								dispatch({
									type: DELETE_COMMENT_SUCCESS
								})
							]).then(() => {
								dispatch(getPostComments(postId));
								dispatch(getPostById(postId));
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: DELETE_COMMENT_ERROR
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
							type: DELETE_COMMENT_ERROR
						})
					})
			]
		})
	}

}

export function deleteCommentReply(replyId, commentId, postId) {
	console.log(replyId);
	console.log(commentId);
	return dispatch => {

		dispatch({
			type: LOADING_COMMENTS
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
				fetch(`${basUrl()}/comment/reply/one/${replyId}`, { ...headers.delHeader() })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							swal.fire(
								'DELETE!',
								'Post has been deleted.',
								'success'
							)
							Promise.all([
								dispatch({
									type: DELETE_COMMENT_SUCCESS
								})
							]).then(() => {
								dispatch(getPostComments(postId));
								dispatch(getPostById(postId));
							})
						} else {
							swal.fire(
								'Deleted!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: DELETE_COMMENT_ERROR
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
							type: DELETE_COMMENT_ERROR
						})
					})
			]
		})
	}

}

export function updateAComment({id, content, postId}) {
	return dispatch => {
		dispatch({
			type: LOADING_COMMENTS
		})
		fetch(`${basUrl()}/comment/update/${id}`, { ...headers.reqHeader( 'PATCH', {content}) })
		.then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					console.log(comment)
					// return dispatch({
					// 	type: UPDATE_COMMENT_SUCCESS,
					// 	payload: {id, content}
					// });
					Promise.all([
						dispatch({
							type: UPDATE_COMMENT_SUCCESS
						})
					]).then(() => {
						dispatch(getPostComments(postId));
						dispatch(getPostById(postId));
					})
				} else {
					console.log(comment);
					return dispatch({
						type: UPDATE_COMMENT_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			swal.fire({
				title: 'COMMENT TO POST',
				text: 'Service unavailable',
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: UPDATE_COMMENT_ERROR,
				payload: error
			});
		});
	}
}

export function updateACommentReply(model) {
	console.log(model);
	return dispatch => {
		dispatch({
			type: LOADING_COMMENTS
		})
		fetch(`${basUrl()}/comment/reply/update/${model.replyId}`, { ...headers.reqHeader('PATCH', {content: model.content} ) })
		.then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					console.log(comment)
					// return dispatch({
					// 	type: UPDATE_COMMENT_REPLY_SUCCESS,
					// 	payload: {replyId, content, commentId}
					// });
					Promise.all([
						dispatch({
							type: UPDATE_COMMENT_REPLY_SUCCESS
						})
					]).then(() => {
						dispatch(getPostComments(model.id));
						dispatch(getPostById(model.id));
					})
				} else {
					console.log(comment);
					return dispatch({
						type: UPDATE_COMMENT_REPLY_ERROR
					});
				}
			}
		)
		.catch(error => {
			swal.fire({
				title: 'UPDATE TO COMMENT REPLY WAS NOT SUCCESSFUL',
				text: 'Service unavailable',
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: UPDATE_COMMENT_REPLY_ERROR
			});
		});
	}
}

export function submitBlogCommentReply(data, id) {
	return dispatch => {
		dispatch({
			type: LOADING_COMMENTS
		})
		fetch(`${getBaseUrl()}/comment/reply/new`, { ...headers.reqHeader('POST', data) })
		.then(res => res.json()).then(
			comment => {
				if(comment.success === true) {
					swal.fire({
						title: 'COMMENT TO A COMMENT',
						text: comment.message,
						icon: 'success',
						timer: 3000,
					})
					// return dispatch({
					// 	type: COMMENT_TO_COMMENT_SUCCESS,
					// 	payload: comment.data
					// });
					Promise.all([
						dispatch({
							type: COMMENT_TO_COMMENT_SUCCESS
						})
					]).then(() => {
						dispatch(getPostComments(id));
						dispatch(getPostById(id));
					})
				} else {
					swal.fire({
						title: 'COMMENT TO A COMMENT',
						text: comment.message,
						icon: 'error',
						timer: 3000,
					})
					return dispatch({
						type: COMMENT_TO_COMMENT_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
			swal.fire({
				title: 'COMMENT TO POST',
				text: 'Service unavailable',
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: COMMENT_TO_COMMENT_ERROR,
				payload: error
			});
		});
	}
}
