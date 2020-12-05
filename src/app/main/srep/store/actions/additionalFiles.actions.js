import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import swal from 'sweetalert2';
import * as Actions from './srep.actions';

export const LOADING_SREP = 'LOADING SREP';
export const GET_SREP_SUCCESS = 'GET SREP SUCCESS';
export const GET_SREP_ERROR = 'GET SREP ERROR';
export const ADD_ENDORSED_FILES_SUCCESS = 'ADD ENDORSED FILES SUCCESS';
export const ADD_ENDORSED_FILES_ERROR = 'ADD ENDORSED FILES ERROR';
export const ADD_EMAIL_FILES_SUCCESS = 'ADD EMAIL FILES SUCCESS';
export const ADD_EMAIL_FILES_ERROR = 'ADD EMAIL FILES ERROR';
export const ADD_BOARD_FILES_SUCCESS = 'ADD BOARD FILES SUCCESS';
export const ADD_BOARD_FILES_ERROR = 'ADD BOARD FILES ERROR';
export const ADD_TRUST_DEED_FILES_LOADING = 'ADD TRUST DEED FILES LOADING';
export const ADD_TRUST_DEED_FILES_SUCCESS = 'ADD TRUST DEED FILES SUCCESS';
export const ADD_TRUST_DEED_FILES_ERROR = 'ADD TRUST DEED FILES ERROR';
export const ADD_TRUST_ACC_DETAILS_FILES_LOADING = 'ADD TRUST ACCOUNT DETAILS FILES LOADING';
export const ADD_TRUST_ACC_DETAILS_FILES_SUCCESS = 'ADD TRUST ACCOUNT DETAILS FILES SUCCESS';
export const ADD_TRUST_ACC_DETAILS_FILES_ERROR = 'ADD TRUST ACCOUNT DETAILS FILES ERROR';

const baseUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function addEndorsed(payload, srepId){
	return dispatch => {
		// swal.fire('Processing ...');
		// swal.showLoading();
		fetch(`${baseUrl()}/srep/otherfiles`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				Promise.all([
					dispatch({
						type: ADD_ENDORSED_FILES_SUCCESS,
						endorsedSuccess: true,
						loading: false,
						endorsedId: data.data.id
					})
				]).then(() => {
					dispatch(Actions.getSrepByID(srepId))
				})
			} else {
				dispatch({
					type: ADD_ENDORSED_FILES_ERROR,
					endorsedSuccess: false,
					loading: false,
					endorsedId: 0
				});
			}
		})
		.catch(e => {
			console.error(e);
			dispatch({
				type: ADD_ENDORSED_FILES_ERROR,
				endorsedSuccess: false,
				loading: false,
				endorsedId: 0
			});
		});
	};
}

export function addEmailIndemnity(payload, srepId){
	return dispatch => {
		// swal.fire('Processing ...');
		// swal.showLoading();
		fetch(`${baseUrl()}/srep/otherfiles`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				Promise.all([
					dispatch({
						type: ADD_EMAIL_FILES_SUCCESS,
						emailSuccess: true,
						loading: false,
						emailIndemnityId: data.data.id
					})
				]).then(() => {
					dispatch(Actions.getSrepByID(srepId))
				})
			} else {
				dispatch({
					type: ADD_EMAIL_FILES_ERROR,
					emailSuccess: false,
					loading: false,
					emailIndemnityId: 0
				});
			}
		})
		.catch(e => {
			console.error(e);
			dispatch({
				type: ADD_EMAIL_FILES_ERROR,
				emailSuccess: false,
				loading: false,
				emailIndemnityId: 0
			});
		});
	};
}

export function addBoardResolution(payload, srepId){
	return dispatch => {
		// swal.fire('Processing ...');
		// swal.showLoading();
		fetch(`${baseUrl()}/srep/otherfiles`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				Promise.all([
					dispatch({
						type: ADD_BOARD_FILES_SUCCESS,
						boardSuccess: true,
						loading: false,
						boardResolutionId: data.data.id
					})
				]).then(() => {
					dispatch(Actions.getSrepByID(srepId))
				})
			} else {
				dispatch({
					type: ADD_BOARD_FILES_ERROR,
					boardSuccess: false,
					loading: false,
					boardResolutionId: 0
				});
			}
		})
		.catch(e => {
			console.error(e);
			dispatch({
				type: ADD_BOARD_FILES_ERROR,
				boardSuccess: false,
				loading: false,
				boardResolutionId: 0
			});
		});
	};
}

export function addTrustDeed(payload, srepId){
	return dispatch => {
		// swal.fire('Processing ...');
		// swal.showLoading();
		dispatch({type: ADD_TRUST_DEED_FILES_LOADING});
		fetch(`${baseUrl()}/srep/otherfiles`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				Promise.all([
					dispatch({
						type: ADD_TRUST_DEED_FILES_SUCCESS,
						trustDeedSuccess: true,
						trustDeedLoading: false,
						trustDeedId: data.data.id
					})
				]).then(() => {
					dispatch(Actions.getSrepByID(srepId))
				})
			} else {
				dispatch({
					type: ADD_TRUST_DEED_FILES_ERROR,
					trustDeedSuccess: false,
					trustDeedLoading: false,
					trustDeedId: 0
				});
			}
		})
		.catch(e => {
			console.error(e);
			dispatch({
				type: ADD_TRUST_DEED_FILES_ERROR,
				trustDeedSuccess: false,
				trustDeedLoading: false,
				trustDeedId: 0
			});
		});
	};
}

export function addTrustAccDetails(payload, srepId){
	return dispatch => {
		// swal.fire('Processing ...');
		// swal.showLoading();
		dispatch({type: ADD_TRUST_ACC_DETAILS_FILES_LOADING})
		fetch(`${baseUrl()}/srep/otherfiles`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				Promise.all([
					dispatch({
						type: ADD_TRUST_ACC_DETAILS_FILES_SUCCESS,
						trustAccDetailSuccess: true,
						trustAccDetailLoading: false,
						trustAccDetailId: data.data.id
					})
				]).then(() => {
					dispatch(Actions.getSrepByID(srepId))
				})
			} else {
				dispatch({
					type: ADD_TRUST_ACC_DETAILS_FILES_ERROR,
					trustAccDetailSuccess: false,
					trustAccDetailLoading: false,
					trustAccDetailId: 0
				});
			}
		})
		.catch(e => {
			console.error(e);
			dispatch({
				type: ADD_TRUST_ACC_DETAILS_FILES_ERROR,
				trustAccDetailSuccess: false,
				trustAccDetailLoading: false,
				trustAccDetailId: 0
			});
		});
	};
}