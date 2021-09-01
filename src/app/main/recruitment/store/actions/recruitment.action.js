import { getBaseUrl } from 'app/shared/getBaseUrl';
import api from 'app/services/api';
import loading from "utils/loading";
import { fetchHeaders } from 'app/shared/fetchHeaders'
import swal from 'sweetalert2';


export const LOADING_POSITIONS = 'LOADING POSITIONS';
export const LOADING_ONE_POSITIONS = 'LOADING ONE POSITIONS';

export const OPEN_CREATE_OPENING_MODAL = 'OPEN CREATE OPENING MODAL';

export const CLOSE_CREATE_OPENING_MODAL = 'CLOSE CREATE OPENING MODAL';

export const GET_ALL_OPEN_POSITIONS_SUCCESS = 'GET ALL OPEN POSITIONS SUCCESS';
export const GET_ALL_OPEN_POSITIONS_ERROR = 'GET ALL OPEN POSITIONS ERROR';

export const GET_ONE_OPEN_POSITIONS_SUCCESS = 'GET ONE OPEN POSITIONS SUCCESS';
export const GET_ONE_OPEN_POSITIONS_ERROR = 'GET ONE OPEN POSITIONS ERROR';

export const CREATE_OPENING_SUCCESS = 'CREATE OPENING SUCCESS';
export const CREATE_OPENING_ERROR = 'CREATE OPENING ERROR';

export const PUBLISH_OPENING_SUCCESS = 'PUBLISH OPENING SUCCESS';
export const PUBLISH_OPENING_ERROR = 'PUBLISH OPENING ERROR';

export const ASSIGN_RECRUITER_SUCCESS = 'ASSIGN RECRUITER SUCCESS';
export const ASSIGN_RECRUITER_ERROR = 'ASSIGN RECRUITER ERROR';

export const DELETE_OPENING_SUCCESS = 'DELETE OPENING SUCCESS';
export const DELETE_OPENING_ERROR = 'DELETE OPENING ERROR';

export const UPDATE_OPENING_SUCCESS = 'UPDATE OPENING SUCCESS';
export const UPDATE_OPENING_ERROR = 'UPDATE OPENING ERROR';

export const ClOSE_SUCCESS = 'ClOSE SUCCESS'

const basUrl = getBaseUrl;
const headers = fetchHeaders();

export function getAllOpenPositions() {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_POSITIONS
			});
			const { data: { data, success, message } } = await api.get('/recruitment/all');
			if (success) {
				dispatch({
					type: GET_ALL_OPEN_POSITIONS_SUCCESS,
					payload: data
				});
			} else {
				dispatch({
					type: GET_ALL_OPEN_POSITIONS_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ALL_OPEN_POSITIONS_ERROR,
				payload: [],
			})
		}
	}
}

export function getOneOpenPosition(positionId) {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_ONE_POSITIONS
			});
			const { data: { data, success, message } } = await api.get(`recruitment/one/${positionId}`);
			if (success) {
				dispatch({
					type: GET_ONE_OPEN_POSITIONS_SUCCESS,
					payload: data
				});
			} else {
				dispatch({
					type: GET_ONE_OPEN_POSITIONS_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ONE_OPEN_POSITIONS_ERROR,
				payload: [],
			})
		}
	}
}


export function getOneCandidateByHash(hash) {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_ONE_POSITIONS
			});
			const { data: { data, success, message } } = await api.get(`/recruitment/?hash=${hash}`);
			// console.log({data})
			if (success && data) {
				dispatch({
					type: GET_ONE_OPEN_POSITIONS_SUCCESS,
					payload: data,
				})
			} else {
				dispatch({
					type: GET_ONE_OPEN_POSITIONS_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ONE_OPEN_POSITIONS_ERROR,
				payload: [],
			})
		}
	}
}

export function createOpening(model) {
	return async(dispatch) => {
		try{
			loading('Creating...');
			dispatch({
				type: LOADING_POSITIONS
			});
			const { data: { data, success, message } } = await api.post('/recruitment/request', model);
			if(success) {
				dispatch({
					type: CREATE_OPENING_SUCCESS,
				})
				dispatch({
					type: CLOSE_CREATE_OPENING_MODAL
				});
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'success'
				}).then(() => {
				dispatch(getAllOpenPositions())
				});
			}else{
				swal.fire({
					title: data.message,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_OPENING_ERROR,
					payload: [],
				})
			}
		}catch(err){
			dispatch({
				type: CREATE_OPENING_ERROR,
				payload: [],
			})
			swal.fire({
				title: err.message,
				text: 'Oops! Something went wrong. Check your network',
				timer: 3000,
				icon: 'error'
			})
		}
	}
}


export function publishOpening(model, id) {
	return async(dispatch) => {
		try{
			loading('Publishing...');
			dispatch({
				type: LOADING_POSITIONS
			});
			const { data: { data, success, message } } = await api.patch(`/recruitment/publish/${id}`, model);
			if(success) {
				dispatch({
					type: CREATE_OPENING_SUCCESS,
				})
				dispatch({
					type: CLOSE_CREATE_OPENING_MODAL
				});
				dispatch(getOneOpenPosition(id))
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'success'
				})
			}else{
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_OPENING_ERROR,
					payload: [],
				})
			}
		}catch(err){
			dispatch({
				type: CREATE_OPENING_ERROR,
				payload: [],
			})
			swal.fire({
				title: err.message,
				text: 'Oops! Something went wrong. Check your network',
				timer: 3000,
				icon: 'error'
			})
		}
	}
}

export function extendClosingDate(id) {
	return dispatch => {
		// dispatch({
		// 	type: LOADING_POSITIONS
		// });
		
		swal.fire({
			title: 'Extend clsoing date of the Job Opening',
			text: 'Extend clsoing date of the Job Opening',
			html: '<input type="date" class="my-10 form-control" id="closingDate"  style= "-moz-appearance: none; -webkit-appearance: none; appearance: none; display: inline-block; min- height: 36px; padding: 8px 12px; width: 100%; margin-top: 5px; background: #fff; border: 1px solid #d9d9d9; border-top: 1px solid #c0c0c0; -webkit-box-sizing: border-box; box-sizing: border-box; -moz-border-radius: 1px; -webkit-border-radius: 1px; border-radius: 1px; font-size: 15px; color: #404040; outline: none;"/>',
			icon: 'warning',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'CONTINUE',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return api.patch(`/recruitment/extend/${id}`, {
					closingDate: document.getElementById('closingDate').value
				}).then(response => {
					return response.data;
				}).catch(err => {
					swal.showValidationMessage(`Request failed: ${err}`);	
				})
			},
			allowOutsideClick: () => !swal.isLoading()
		}).then((result) => {
			console.log(result)
		if (result?.isConfirmed) {
			const {message, success, data} = result?.value;
			if(success) {
				dispatch({
					type: CREATE_OPENING_SUCCESS,
				})
				dispatch({
					type: CLOSE_CREATE_OPENING_MODAL
				});
				dispatch(getOneOpenPosition(id))
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'success'
				})
			}else{
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: CREATE_OPENING_ERROR,
					payload: [],
				})
			}
		}
		})
	}

}

export function assignRecruiter(hrId, formData) {
	return dispatch => {
		dispatch({
			type: LOADING_POSITIONS
		});
		fetch(`${basUrl()}/recruitment/assign/${hrId}`, { ...headers.formDHeader('PATCH', formData) })
			.then(res => res.json()).then(async data => {
				if (data.success) {
					dispatch({
						type: ASSIGN_RECRUITER_SUCCESS,
					})
					swal.fire({
						title: data.message,
						timer: 3000,
						icon: 'success'
					})
					dispatch(getAllOpenPositions());
				} else {
					swal.fire({
						title: data.message,
						timer: 3000,
						icon: 'error'
					})
					dispatch({
						type: ASSIGN_RECRUITER_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: ASSIGN_RECRUITER_ERROR,
					payload: [],
				})
				swal.fire({
					title: err.message,
					text: 'Oops! Something went wrong. Check your network',
					timer: 3000,
					icon: 'error'
				})
			})
	}
}

export function deleteOpening(model) {
	return dispatch => {
		dispatch({
			type: LOADING_POSITIONS
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
			preConfirm: () => {
				return api.delete(`/recruitment/`, model).then(response => {
					return response.data;
				}).catch(err => {
					swal.showValidationMessage(`Request failed: ${err}`);	
				})
			},
			allowOutsideClick: () => !swal.isLoading()
		}).then((result) => {
			if (result?.isConfirmed) {
				const {message, success} = result?.value;
				if (success) {
					dispatch({
						type: DELETE_OPENING_SUCCESS,
					})
					dispatch(getAllOpenPositions())
					swal.fire(
						'DELETE!',
						'Postion has been deleted.',
						'success'
					)
				} else {
					swal.fire(
						'Delete not successful!',
						message,
						'error'
					)
					return dispatch({
						type: DELETE_OPENING_ERROR
					})
				}
			}
		})
	}

}

export function closeOpening(id) {
	return dispatch => {


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
				dispatch({
					type: LOADING_POSITIONS
				}),
				fetch(`${basUrl()}/recruitment/close/${id}`, { ...headers.reqHeader('PATCH', {}) })
					.then(res => res.json()).then(async data => {
						if (data.success) {
							dispatch({
								type: ClOSE_SUCCESS,
							})
							swal.fire(
								'DELETE!',
								'Postion has been closed.',
								'success'
							)
						} else {
							swal.fire(
								'Delete not successful!',
								'something went wrong',
								'error'
							)
							return dispatch({
								type: DELETE_OPENING_ERROR
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
							type: DELETE_OPENING_ERROR
						})
					})
			]
		})
	}

}

export function hrCreateOpening(id, dispatch) {
	swal.showLoading();

	// dispatch => {
	fetch(`${basUrl()}/recruitment/new/${id}`, { ...headers.reqHeader('PATCH') })
		.then(res => res.json()).then(async data => {
			if (data.success) {
				swal.fire(
					'New Opening',
					'Postion is now Open to be shared',
					'success'
				);
				window.location.reload();
			} else {
				swal.fire(
					'New Opening',
					'something went wrong',
					'error'
				)
			}
		}
		).catch(e => {
			console.error(e);
			swal.fire(
				'Oops!',
				'something went wrong',
				'error'
			)
		})
		.finally(() => {
			swal.hideLoading();
		})
}
// }

export function updateOpening(payload, positionId) {
	swal.fire("Processing ...");
	swal.showLoading();
	return dispatch => {
		dispatch({
			type: LOADING_POSITIONS
		})
		fetch(`${basUrl()}/recruitment/update/${positionId}`, { ...headers.reqHeader('PATCH', payload) }
		).then(res => res.json()).then(async data => {
			console.log(data);
			if (data.success || data.message === 'OpenPosition update successful') {
				dispatch({
					type: UPDATE_OPENING_SUCCESS,
					payload: data.data,
				})
				swal.fire({
					title: 'Update Position',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'success'
				})
				dispatch(getAllOpenPositions());
			} else {
				swal.fire({
					title: 'Update Position',
					text: (data.message) ? data.message : data.error,
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: UPDATE_OPENING_ERROR
				})
			}
		}).catch(e => {
			console.error(e);
			swal.fire({
				title: 'Update Position',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			})
			dispatch({
				type: UPDATE_OPENING_ERROR
			})
		})
	}
}
