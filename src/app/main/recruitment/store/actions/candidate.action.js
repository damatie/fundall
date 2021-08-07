import loading from "utils/loading";
import api from 'app/services/api';
import swal from 'sweetalert2';

export const LOADING_CANDIDATE = 'LOADING CANDIDATE';
export const LOADING_ONE_CANDIDATE = 'LOADING ONE CANDIDATE';

export const OPEN_CREATE_CANDIDATE_OPENING_MODAL = 'OPEN CREATE CANDIDATE OPENING MODAL';

export const CLOSE_CREATE_CANDIDATE_OPENING_MODAL = 'CLOSE CREATE CANDIDATE OPENING MODAL';

export const SHOW_EDIT_FORM = 'SHOW_EDIT_FORM';
export const HIDE_EDIT_FORM = 'HIDE_EDIT_FORM';

export const SHOW_SHORTLIST_BUTTON = 'SHOW SHORTLIST BUTTON';
export const HIDE_SHORTLIST_BUTTON = 'HIDE SHORTLIST BUTTON';

export const ADD_CANDIDATE_SUCCESS = 'ADD CANDIDATE SUCCESS';
export const ADD_CANDIDATE_ERROR = 'ADD CANDIDATE ERROR';

export const UPDATE_CANDIDATE_SUCCESS = 'UPDATE CANDIDATE SUCCESS';
export const UPDATE_CANDIDATE_ERROR = 'UPDATE CANDIDATE ERROR';

export const DELETE_CANDIDATE_SUCCESS = 'DELETE CANDIDATE SUCCESS';
export const DELETE_CANDIDATE_ERROR = 'DELETE CANDIDATE ERROR';

export const GET_ALL_CANDIDATE_SUCCESS = 'GET ALL CANDIDATE SUCCESS';
export const GET_ALL_CANDIDATE_ERROR = 'GET ALL CANDIDATE SUCCESS';

export const GET_ONE_CANDIDATE_SUCCESS = 'GET ALONEL CANDIDATE SUCCESS';
export const GET_ONE_CANDIDATE_ERROR = 'GET ONE CANDIDATE SUCCESS';

export function addCandidate(model, positionId) {
	console.log(model)
	return async(dispatch) => {
		loading('adding...');
		try{
			dispatch({
				type: LOADING_CANDIDATE
			});
			const { data: { data, success, message } } = await api.post(`/recruitment/${positionId}/candidate/`, model);
			if (success) {
				dispatch({
					type: ADD_CANDIDATE_SUCCESS,
				})
				dispatch({
					type: CLOSE_CREATE_CANDIDATE_OPENING_MODAL,
				})
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'success'
				})
				.then(function () {
					window.location.href = `/recruitment/position_details/${positionId}`;
				});
			} else {
				swal.fire({
					title: 'Failed to add candidate',
					text: message,
					icon: 'error'
				})
				dispatch({
					type: ADD_CANDIDATE_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: ADD_CANDIDATE_ERROR,
				payload: [],
			})
			swal.fire({
				title: 'Oops!',
				text: 'Something went wrong. Please check your connection.',
				icon: 'error'
			})
		}
	}
}

export function updateCandidate(model, positionId, id) {
	return async(dispatch) => {
		loading('updating...');
		try{
			dispatch({
				type: LOADING_CANDIDATE
			});
			const { data: { data, success, message } } = await api.patch(`/recruitment/${positionId}/candidate/${id}`, model);
			if (success) {
				dispatch({
					type: UPDATE_CANDIDATE_SUCCESS,
				})
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'success'
				}).then(function(){
					dispatch(getAllCandidates(positionId))
					dispatch(getOneCandidates(positionId, id))
					dispatch({
						type: HIDE_EDIT_FORM,
					});
				});
			} else {
				swal.fire({
					title: 'Candidate update was not successful',
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: UPDATE_CANDIDATE_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: UPDATE_CANDIDATE_ERROR,
				payload: [],
			})
			swal.fire({
				title: 'Oops!',
				text: 'Something went wrong. Please check your connection.',
				icon: 'error'
			})
		}
	}
}

export function candidateApply(model, hash, setApply) {
	return async(dispatch) => {
		loading('processing...');
		try{
			dispatch({
				type: LOADING_CANDIDATE
			});
			const { data: { data, success, message } } = await api.post(`/recruitment/candidate/apply?hash=${hash}`, model);
			if (success) {
				dispatch({
					type: ADD_CANDIDATE_SUCCESS,
				})
				swal.fire({
					title: message,
					icon: 'success'
				}).then(function(){
					setApply(false);	
				});
			} else {
				swal.fire({
					title: message,
					icon: 'error'
				})
				dispatch({
					type: ADD_CANDIDATE_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: ADD_CANDIDATE_ERROR,
				payload: [],
			})
			swal.fire({
				title: 'Oops!',
				text: 'Something went wrong. Please check your connection.',
				icon: 'error'
			})
		}
	}
}

export function shortlistCandidate(model, positionId) {
	return async(dispatch) => {
		loading('updating...');
		try{
			dispatch({
				type: LOADING_CANDIDATE
			});
			const { data: { data, success, message } } = await api.patch(`/recruitment/${positionId}/candidate/shortlist`, model);
			if (success) {
				dispatch({
					type: UPDATE_CANDIDATE_SUCCESS,
				})
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'success'
				});
				dispatch(getAllCandidates(positionId))
				dispatch(getOneCandidates(positionId, model[0]));
			} else {
				swal.fire({
					title: 'Candidate update was not successful',
					timer: 3000,
					icon: 'error'
				})
				dispatch({
					type: UPDATE_CANDIDATE_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: UPDATE_CANDIDATE_ERROR,
				payload: [],
			})
			swal.fire({
				title: 'Oops!',
				text: 'Something went wrong. Please check your connection.',
				icon: 'error'
			})
		}
	}
}

export function getAllCandidates(positionId) {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_CANDIDATE
			});
			const { data: { data, success, message } } = await api.get(`/recruitment/${positionId}/candidate/`);
			console.log({data})
			if (success && data) {
				dispatch({
					type: GET_ALL_CANDIDATE_SUCCESS,
					payload: data,
				})
			} else {
				dispatch({
					type: GET_ALL_CANDIDATE_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ALL_CANDIDATE_ERROR,
				payload: [],
			})
		}
	}
}

export function getOneCandidates(positionId, id) {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_ONE_CANDIDATE
			});
			const { data: { data, success, message } } = await api.get(`/recruitment/${positionId}/candidate/${id}`);
			// console.log({data})
			if (success && data) {
				dispatch({
					type: GET_ONE_CANDIDATE_SUCCESS,
					payload: data,
				})
			} else {
				dispatch({
					type: GET_ONE_CANDIDATE_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ONE_CANDIDATE_ERROR,
				payload: [],
			})
		}
	}
}

export function deleteCandidate(candidateId) {
	return dispatch => {
		dispatch({
			type: LOADING_CANDIDATE
		});

		swal.fire({
			title: 'Delete this candidate?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete candidate!',
			showLoaderOnConfirm: true,
			preConfirm: async() => {
				try{
				const { data: { data, success, message } } = await api.delete(`/recruitment/candidate/one/${candidateId}`);
					if (success) {
						dispatch({
							type: DELETE_CANDIDATE_SUCCESS,
							payload: candidateId,
						})
						swal.fire(
							'CANDIDATE DELETED!',
							'Candidate has been deleted.',
							'success'
						)
					} else {
						swal.fire(
							'Failed to delete Candidate!',
							message,
							'error'
						)
						return dispatch({
							type: DELETE_CANDIDATE_ERROR
						})
					}
				}catch(e){
					console.error(e);
					swal.fire(
						'Oops!',
						'something went wrong',
						'error'
					)
					return dispatch({
						type: DELETE_CANDIDATE_ERROR
					})
				}
				}
		})
	}

}

