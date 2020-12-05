import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import { useAuthentication } from 'app/hooks/useAuthentication';
import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { redirectUrl } from '../../redirectUrl';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { handleResponse } from 'app/auth/handleRes';
import { GET_EMPLOYEE_PROFILE, LOADING_EMPLOYEE_PROFILE } from 'app/store/actions';
import { GET_NOTIFICATIONS, LOADING_NOTIFICATIONS } from 'app/main/notifications/store/actions';
import api from 'app/services/api';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_LOADING = 'LOGIN_LOADING';


const header = fetchHeaders();

export function submitLogin(data) {
	return dispatch => {
		dispatch({
			type: LOGIN_LOADING
		})
		api.post('/auth/employee/login', data).then(({ data: { success, message, token, data } }) => {
			if (success) {
				Swal.fire({
					title: 'Login',
					text: message,
					icon: 'success',
					timer: 3000,
				});
				api.defaults.headers.Authorization = `JWT ${token}`;
				localStorage.setItem('jwt_access_token', JSON.stringify(token));
				const userState = {
					role: data.role.name,
					redirectUrl: '/employee/dashboard',
					id: data.id,
					data: {
						displayName: `${data.firstName} ${data.lastName}`,
						photoURL: data.profilePicture,
						email: data.email,
						shortcuts: ['loan_request', 'request_leave', 'blog_list', 'todo'],
						department: data.department,
						details: data.info
					}
				};
				localStorage.setItem('user_data', JSON.stringify(userState));
				dispatch(getProfile({ id: data.id, token }));
				dispatch(UserActions.setUserData(userState));
				dispatch(getNotification(token));
				return dispatch({
					type: LOGIN_SUCCESS
				});
			} else {
				Swal.fire({
					title: 'Login',
					text: message,
					icon: 'error',
					timer: 3000,
				})
				return dispatch({
					type: LOGIN_ERROR,
					payload: ''
				});
			}
		}).catch(error => {
			Swal.fire({
				title: 'Login',
				text: error.response?.data.error || error.response?.data.message,
				icon: 'error',
				timer: 3000,
			})
			return dispatch({
				type: LOGIN_ERROR,
				payload: error.response?.data.error || error.response?.data.message
			});
		});

	}
}

const getProfile = ({ id, token, }) => {
	return dispatch => {
		dispatch({
			type: LOADING_EMPLOYEE_PROFILE
		});
		fetch(`${getBaseUrl()}/auth/employee/${id}`, {
			headers: {
				authorization: `JWT ${token}`
			}
		}).then(res => handleResponse(res)).then(
			data => {
				console.log(data.data)
				// localStorage.setItem('user_profile', JSON.stringify(data.data));
				dispatch({
					type: GET_EMPLOYEE_PROFILE,
					payload: data.data
				})
			}
		)
	}
}

const getNotification = token => {
	return dispatch => {
		dispatch({
			type: LOADING_NOTIFICATIONS
		});
		fetch(`${getBaseUrl()}/notification`, {
			headers: {
				authorization: `JWT ${token}`
			}
		}).then(res => handleResponse(res)).then(
			data => {
				console.log(data)
				dispatch({
					type: GET_NOTIFICATIONS,
					payload: (data.data) ? data.data : []
				})
			}
		)
	}
}

export function submitLoginWithFireBase({ username, password }) {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}

	return dispatch =>
		firebaseService.auth
			.signInWithEmailAndPassword(username, password)
			.then(() => {
				return dispatch({
					type: LOGIN_SUCCESS
				});
			})
			.catch(error => {
				console.info('error');
				const usernameErrorCodes = [
					'auth/email-already-in-use',
					'auth/invalid-email',
					'auth/operation-not-allowed',
					'auth/user-not-found',
					'auth/user-disabled'
				];
				const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

				const response = {
					username: usernameErrorCodes.includes(error.code) ? error.message : null,
					password: passwordErrorCodes.includes(error.code) ? error.message : null
				};

				if (error.code === 'auth/invalid-api-key') {
					dispatch(Actions.showMessage({ message: error.message }));
				}

				return dispatch({
					type: LOGIN_ERROR,
					payload: response
				});
			});
}
