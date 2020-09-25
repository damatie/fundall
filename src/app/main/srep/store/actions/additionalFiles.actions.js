import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import swal from 'sweetalert2';

export const LOADING_SREP = 'LOADING SREP';
export const GET_SREP_SUCCESS = 'GET SREP SUCCESS';
export const GET_SREP_ERROR = 'GET SREP ERROR';
export const ADD_ENDORSED_FILES_SUCCESS = 'ADD ENDORSED FILES SUCCESS';
export const ADD_ENDORSED_FILES_ERROR = 'ADD ENDORSED FILES ERROR';
export const ADD_EMAIL_FILES_SUCCESS = 'ADD EMAIL FILES SUCCESS';
export const ADD_EMAIL_FILES_ERROR = 'ADD EMAIL FILES ERROR';
export const ADD_BOARD_FILES_SUCCESS = 'ADD BOARD FILES SUCCESS';
export const ADD_BOARD_FILES_ERROR = 'ADD BOARD FILES ERROR';

const baseUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function addEndorsed(payload){
	return dispatch => {
		// swal.fire('Processing ...');
		// swal.showLoading();
		dispatch({
			type: LOADING_SREP
		});
		fetch(`${baseUrl()}/api/v1/srep/otherfiles`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				dispatch({
					type: ADD_ENDORSED_FILES_SUCCESS,
					endorsedSuccess: true,
					loading: false,
					endorsedId: data.data.id
				});
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

export function addEmailIndemnity(payload){
	return dispatch => {
		// swal.fire('Processing ...');
		// swal.showLoading();
		dispatch({
			type: LOADING_SREP
		});
		fetch(`${baseUrl()}/api/v1/srep/otherfiles`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				dispatch({
					type: ADD_EMAIL_FILES_SUCCESS,
					emailSuccess: true,
					loading: false,
					emailIndemnityId: data.data.id
				});
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

export function addBoardResolution(payload){
	return dispatch => {
		// swal.fire('Processing ...');
		// swal.showLoading();
		dispatch({
			type: LOADING_SREP
		});
		fetch(`${baseUrl()}/api/v1/srep/otherfiles`, { ...headers.fdHeader('post', payload) })
		.then(res => res.json()).then(async data => {
			console.log(data)
			if (data.success) {
				dispatch({
					type: ADD_BOARD_FILES_SUCCESS,
					boardSuccess: true,
					loading: false,
					boardResolutionId: data.data.id
				});
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