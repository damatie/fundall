import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const LOADING_TRAINIING = 'LOADING TRAINING';
export const GET_APPROVED_TRAINING = 'GET APPROVED TRAINING';
export const GET_REJECTED_TRAINING = 'GET REJECTED TRAINING';
export const GET_PENDING_TRAINING = 'GET PENDING TRAINING';
export const APPROVE_TRAINING_SUCCESS = 'APPROVE TRAINING SUCCESS';
export const APPROVE_TRAINING_ERROR = 'APPROVE TRAINING ERROR';
export const REJECT_TRAINING_SUCCESS = 'REJECT TRAINING SUCCESS';
export const REJECT_TRAINING_ERROR = 'REJECT TRAINING ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
export function getApprovedTraining() {
	return dispatch => {
		dispatch({
			type: LOADING_TRAINIING
		});
		fetch(`${basUrl()}/training/all/dept/approved`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data.data);
			data.success ? 
				(data.data) ? 
					dispatch({
						type: GET_APPROVED_TRAINING,
						payload: data.data
					})
				:
					dispatch({
						type: GET_APPROVED_TRAINING,
						payload: []
					})
			:
				dispatch({
					type: GET_APPROVED_TRAINING,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			// swal.fire(
            //     'Oops!',
            //     'something went wrong',
            //     'error'
			//   )
			dispatch({
				type: GET_APPROVED_TRAINING,
				payload: []
			})
		})
	}
}

export function getRejectedTraining() {
	return dispatch => {
		dispatch({
			type: LOADING_TRAINIING
		});
		fetch(`${basUrl()}/training/all/dept/rejected`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data.data);
			data.success ? 
			(data.data) ? 
				dispatch({
					type: GET_REJECTED_TRAINING,
					payload: data.data
				})
				:
				dispatch({
					type: GET_REJECTED_TRAINING,
					payload: []
				})
			:
				dispatch({
					type: GET_REJECTED_TRAINING,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			// swal.fire(
            //     'Oops!',
            //     'something went wrong',
            //     'error'
			//   )
			dispatch({
				type: GET_REJECTED_TRAINING,
				payload: []
			})
		})
	}
}

export function getPendingTraining() {
	return dispatch => {
		dispatch({
			type: LOADING_TRAINIING
		});
		fetch(`${basUrl()}/training/all/dept/pending`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data.data);
			data.success ? 
			(data.data) ? 
				dispatch({
					type: GET_PENDING_TRAINING,
					payload: data.data
				})
			:
				dispatch({
					type: GET_PENDING_TRAINING,
					payload: []
				})
			:
				dispatch({
					type: GET_PENDING_TRAINING,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			// swal.fire(
            //     'Oops!',
            //     'something went wrong',
            //     'error'
			//   )
			dispatch({
				type: GET_PENDING_TRAINING,
				payload: []
			})
		})
	}
}

export function approveTraining(id){
	console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_TRAINIING
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
		  fetch(`${basUrl()}/training/hod/approve/${id}`, {...headers.delHeader()})
		  .then(res => res.json()).then(async data => {
			  if(data.success) {
				swal.fire(
				  'Approved!',
				  'Training request has been approved.',
				  'success'
				);
				return dispatch({
				  type: APPROVE_TRAINING_SUCCESS,
				//   payload: await getCategory()
				})
			  } else {
				swal.fire(
				  'Approved!',
				  'something went wrong',
				  'error'
				)
				return dispatch({
					type: APPROVE_TRAINING_ERROR
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
				type: APPROVE_TRAINING_ERROR
			})
		})
		  ]
	  })
	}
}

export function rejectTraining(id){
	console.log(id);
	return dispatch => {
		dispatch({
			type: LOADING_TRAINIING
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
		  fetch(`${basUrl()}/training/hod/reject/${id}`, {...headers.delHeader()})
		  .then(res => res.json()).then(async data => {
			  if(data.success) {
				swal.fire(
				  'Rejected!',
				  'Training request has been approved.',
				  'success'
				);
				return dispatch({
				  type: REJECT_TRAINING_SUCCESS,
				//   payload: await getCategory()
				})
			  } else {
				swal.fire(
				  'Rejected!',
				  'something went wrong',
				  'error'
				)
				return dispatch({
					type: REJECT_TRAINING_ERROR
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
				type: REJECT_TRAINING_ERROR
			})
		})
		  ]
	  })
	}
}