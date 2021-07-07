import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import {formatCurrency} from 'app/shared/formatCurrency';
import swal from 'sweetalert2';

export const LOADING_SREP = 'LOADING SREP';
export const GET_SREP_SUCCESS = 'GET SREP SUCCESS';
export const GET_SREP_ERROR = 'GET SREP ERROR';
export const APPLY_SREP_SUCCESS = 'APPLY SREP SUCCESS';
export const APPLY_SREP_ERROR = 'APPLY SREP ERROR';
export const APPROVE_SREP_SUCCESS = 'APPROVE SREP SUCCESS';
export const APPROVE_SREP_ERROR = 'APPROVE SREP ERROR';
export const REJECT_SREP_SUCCESS = 'REJECT SREP SUCCESS';
export const REJECT_SREP_ERROR = 'REJECT SREP ERROR';
export const DELETE_SREP_SUCCESS = 'DELETE SREP SUCCESS';
export const DELETE_SREP_ERROR = 'DELETE SREP ERROR';
export const SEND_TO_FINANCE_SUCCESS = 'SEND TO FINANCE SUCCESS';
export const SEND_TO_FINANCE_ERROR = 'SEND TO FINANCE ERROR';

const baseUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function getSrep(role = null) {
	return dispatch => {
		dispatch({
			type: LOADING_SREP
		});
		fetch(`${baseUrl()}/srep`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
                // console.log(data);
				let srep = [];
				let count = 0;
				let items = [];
				if (data.success && data.data) {
					// console.log(data.data);
					// console.log({role})
					if(role && role !== 'HR MANAGER'){
						items = data.data && data.data.filter(srep => srep.status !== 'pending');
					}else{
						items = data.data
					}
					srep = data.data && data.data.map(srep => {
						count++;
						return {
							id: srep.id,
							sn: count,
							name: srep.beneficiaryName,
							relationship: srep.beneficiaryRelationship.toUpperCase(),
							fund: formatCurrency('₦', srep.capitalFund),
							status: srep.status
						}
					});
					// console.log({srep});
					dispatch({
						type: GET_SREP_SUCCESS,
						payload: {
							data: items,
							srep: srep
						},
					})
				} else {
					dispatch({
						type: GET_SREP_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_SREP_ERROR,
					payload: [],
				})
			})
	}
}

export function getSrepByEmployeeID(id) {
	return dispatch => {
		dispatch({
			type: LOADING_SREP
		});
		fetch(`${baseUrl()}/srep/employee/${id}`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
                // console.log(data);
				let srep = [];
				let count = 0;
				if (data.success && data.data) {
					// console.log(data.data);
					srep = data.data && data.data.map(srep => {
						count++;
						return {
							id: srep.id,
							sn: count,
							name: srep.beneficiaryName,
							relationship: srep.beneficiaryRelationship.toUpperCase(),
							fund: formatCurrency('₦', srep.capitalFund),
							status: srep.status
						}
					});
					// console.log({srep});
					dispatch({
						type: GET_SREP_SUCCESS,
						payload: {
							data: data.data,
							srep: srep
						},
					})
				} else {
					dispatch({
						type: GET_SREP_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_SREP_ERROR,
					payload: [],
				})
			})
	}
}

export function getSrepByID(id = 0) {
	return dispatch => {
		dispatch({
			type: LOADING_SREP
		});
		fetch(`${baseUrl()}/srep/${id}`, { ...headers.getRegHeader() })
		.then(res => res.json()).then(async data => {
			// console.log(data);
			if (data.success && data.data) {
				return dispatch({
					type: GET_SREP_SUCCESS,
					payload: data.data,
				})
			} else {
				swal.fire(
					'Oops!',
					data.message,
					'error'
				)
				return dispatch({
					type: GET_SREP_ERROR,
					payload: [],
				})
			}
		}).catch(err => {
			console.log(err);
			swal.fire(
				'Oops!',
				'something went wrong',
				'error'
			)
			return dispatch({
				type: GET_SREP_ERROR,
				payload: [],
			})
		})
	}
}

export function addSrep(payload){
	return dispatch => {
		swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
		swal.showLoading();
		dispatch({
			type: LOADING_SREP
		});
		fetch(`${baseUrl()}/srep`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
				// console.log(data)
				if (data.success) {
					swal.fire({
						title: 'SpringRock Education Plan Application',
						text: data.message,
						timer: 3000,
						icon: 'success'
					}).then(function(){
						window.location.href = "/srep/all";
					});
				} else {
					swal.fire({
						title: 'SpringRock Education Plan Application',
						text: data.error,
						timer: 3000,
						icon: 'error'
					});
					dispatch({
						type: APPLY_SREP_ERROR,
						success: false,
						loading: false
					});
				}
			})
			.catch(e => {
				console.error(e);
				swal.fire({
					title: 'SpringRock Education Plan Application',
					text: 'Oops! an error occurred. Kindly check network and try again',
					timer: 3000,
					icon: 'error'
				});
				dispatch({
					type: APPLY_SREP_ERROR,
					success: false,
					loading: false
				});
			});
	};
}

export function approveSrep(id) {
	// console.log(id);
	return dispatch => {
		swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, approve it!',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
				swal.showLoading();
		
				fetch(`${baseUrl()}/srep/approve/${id}`, { ...headers.reqHeader('PATCH', '') })
				.then(res => res.json()).then(async data => {
					if (data.success) {
						swal.fire(
							'APPROVE!',
							'Application has been approved.',
							'success'
						).then(function() {
							Promise.all([
								dispatch({
									type: APPROVE_SREP_SUCCESS
								})
							]).then(() => {
								dispatch(getSrepByID(id))
							})
						})
					} else {
						swal.fire(
							'APPROVE!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: APPROVE_SREP_ERROR
						})
					}
				}).catch(e => {
					console.log(e);
					swal.fire(
						'Oops!',
						'something went wrong',
						'error'
					)
					return dispatch({
						type: APPROVE_SREP_ERROR
					})
				})
			}
		})
	}

}

export function rejectSrep(id) {
	// console.log(id);
	return dispatch => {
		swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
		swal.showLoading();

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
				fetch(`${baseUrl()}/srep/reject/${id}`, { ...headers.reqHeader('PATCH', '') })
				.then(res => res.json()).then(async data => {
					if (data.success) {
						swal.fire(
							'REJECT!',
							'Application has been rejected.',
							'success'
						).then(function(){
							Promise.all([
								dispatch({
									type: REJECT_SREP_SUCCESS
								})
							]).then(() => {
								dispatch(getSrepByID(id))
							})
						})
					} else {
						swal.fire(
							'REJECT!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: REJECT_SREP_ERROR
						})
					}
				}).catch(e => {
					console.log(e);
					swal.fire(
						'Oops!',
						'something went wrong',
						'error'
					)
					return dispatch({
						type: REJECT_SREP_ERROR
					})
				})
			]
		})
	}

}

export function deleteSrep(id, role, userId) {
	// console.log(id);
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
			preConfirm: () => {
				swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
				swal.showLoading();
				fetch(`${baseUrl()}/srep/${id}`, { ...headers.delHeader() })
				.then(res => res.json()).then(async data => {
					if (data.success) {
						swal.fire(
							'DELETE!',
							'Application has been deleted.',
							'success'
						).then(function(){
							Promise.all([
								dispatch({
									type: DELETE_SREP_SUCCESS
								})
							]).then(() => {
								if(role === 'EMPLOYEE'){
									dispatch(getSrepByEmployeeID(userId))
								}else{
									dispatch(getSrep())
								}
							})
						})
					} else {
						swal.fire(
							'REJECT!',
							'something went wrong',
							'error'
						)
						return dispatch({
							type: DELETE_SREP_ERROR
						})
					}
				}).catch(e => {
					console.error(e);
					swal.fire(
						'Oops!',
						'something went wrong',
						'error'
					)
					return dispatch({
						type: DELETE_SREP_ERROR
					})
				})
			}
		})
	}

}

export function sendToFinance(id){
	return dispatch => {
		swal.fire({
            title: 'Processing ...',
            allowOutsideClick: false
        });
		swal.showLoading();
		fetch(`${baseUrl()}/srep/sendToFinance/${id}`, { ...headers.reqHeader('PATCH', '') })
		.then(res => res.json()).then(async data => {
			// console.log(data)
			if (data.success) {
				swal.fire({
					title: 'SpringRock Education Plan Application',
					text: data.message,
					timer: 3000,
					icon: 'success'
				}).then(function() {
					Promise.all([
						dispatch({
							type: SEND_TO_FINANCE_SUCCESS,
							success: true,
							loading: false
						})
					]).then(() => {
						dispatch(getSrepByID(id))
					})
				})
			} else {
				swal.fire({
					title: 'SpringRock Education Plan Application',
					text: data.error,
					timer: 3000,
					icon: 'error'
				});
				dispatch({
					type: SEND_TO_FINANCE_ERROR,
					success: false,
					loading: false
				});
			}
		})
		.catch(e => {
			console.error(e);
			swal.fire({
				title: 'SpringRock Education Plan Application',
				text: 'Oops! an error occurred. Kindly check network and try again',
				timer: 3000,
				icon: 'error'
			});
			dispatch({
				type: SEND_TO_FINANCE_ERROR,
				success: false,
				loading: false
			});
		});
	};
}