import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import swal from 'sweetalert2';

export const LOADING_CANDIDATE = 'LOADING CANDIDATE';

export const ADD_CANDIDATE_SUCCESS = 'ADD CANDIDATE SUCCESS';
export const ADD_CANDIDATE_ERROR = 'ADD CANDIDATE ERROR';

export const UPDATE_CANDIDATE_SUCCESS = 'UPDATE CANDIDATE SUCCESS';
export const UPDATE_CANDIDATE_ERROR = 'UPDATE CANDIDATE ERROR';

export const GET_ALL_CANDIDATE_SUCCESS = 'GET ALL CANDIDATE SUCCESS';
export const GET_ALL_CANDIDATE_ERROR = 'GET ALL CANDIDATE SUCCESS';

const baseUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function addCandidate(model, positionId) {
	return dispatch => {
		dispatch({
			type: LOADING_CANDIDATE
    });
    for (var pair of model.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}
		fetch(`${baseUrl()}/recruitment/candidate/new`, {...headers.reqHeader('POST', model)})
			.then(res => res.json()).then(async data => {
				console.log(data);
				if (data.success) {
					dispatch({
						type: ADD_CANDIDATE_SUCCESS,
          })
          swal.fire({
            title: data.message,
            timer: 3000,
            icon: 'success'
          })
          .then(function(){
            window.location.href = `/recruitment/position_details/${positionId}`;
          });
				} else {
          swal.fire({
            title: 'Add candidate was not successful',
            timer: 3000,
            icon: 'error'
          })
					dispatch({
						type: ADD_CANDIDATE_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: ADD_CANDIDATE_ERROR,
					payload: [],
        })
        swal.fire({
          title: 'Oops!',
          text: 'Something went wrong.',
          timer: 3000,
          icon: 'error'
        })
			})
	}
}

export function updateCandidate(model, candidateId) {
	return dispatch => {
		dispatch({
			type: LOADING_CANDIDATE
    });
    for (var pair of model.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}
		fetch(`${baseUrl()}/recruitment/candidate/update/${candidateId}`, {...headers.fdHeader('PATCH', model)})
			.then(res => res.json()).then(async data => {
				console.log(data);
				if (data.success) {
					dispatch({
						type: UPDATE_CANDIDATE_SUCCESS,
						payload: data.data,
          })
          swal.fire({
            title: data.message,
            timer: 3000,
            icon: 'success'
          })
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
			}).catch(err => {
				console.log(err);
				dispatch({
					type: UPDATE_CANDIDATE_ERROR,
					payload: [],
        })
        swal.fire({
          title: 'Oops!',
          text: 'Something went wrong.',
          timer: 3000,
          icon: 'error'
        })
			})
	}
}

export function getAllCandidates(positionId) {
	return dispatch => {
		dispatch({
			type: LOADING_CANDIDATE
		});
		fetch(`${baseUrl()}/recruitment/candidate/all/${positionId}`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
				console.log(data);
				if (data.success && data.data) {
					dispatch({
						type: GET_ALL_CANDIDATE_SUCCESS,
						payload: data.data,
					})
				} else {
					dispatch({
						type: GET_ALL_CANDIDATE_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_ALL_CANDIDATE_ERROR,
					payload: [],
				})
			})
	}
}
