import firebaseService from 'app/services/firebaseService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import Swal from 'sweetalert2';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { handleResponse } from 'app/auth/handleRes';

import { GET_EMPLOYEE_PROFILE, LOADING_EMPLOYEE_PROFILE, GET_USER_MENU, LOADING_USER_MENU, GET_NAVIGATION, SET_NAVIGATION, getDepartmentEmployees } from 'app/store/actions';
import api from 'app/services/api';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_LOADING = 'LOGIN_LOADING';

export function submitLogin(data, x) {
	return dispatch => {
		dispatch({
			type: LOGIN_LOADING
		});
		api.post(`/auth/${x || "employee"}/login`, data).then((response) => {
			console.log(response.data)
			const { success, message, token, data } = response.data;
			if (success) {
				api.defaults.headers.Authorization = `JWT ${token}`;
				localStorage.setItem('jwt_access_token', JSON.stringify(token));
				localStorage.setItem('login_data', JSON.stringify(data));
				let redirectUrl = '/employee/dashboard';
				if (data?.role?.name.toLowerCase().trim() === "hr admin") {
					if (data?.company?.hasEntities === true)  {
						// route to complete registration
						if (data?.company?.regStep < 4) {
							// console.log('should Redirect to Complete Registration ');
							// redirectUrl ='/auth/complete-registration';
							redirectUrl ='/company/setup';
							Swal.fire({
								title: 'Login Successful',
								text: 'Kindly Complete Company Registration',
								icon: 'success',
								timer: 3000,
							});
						} else {
							Swal.fire({
								title: 'Login Successful',
								text: message,
								icon: 'success',
								timer: 3000,
							});
						}
					} else {
						// route to complete registration
						if (data?.company?.regStep < 3) {
							// console.log('should Redirect to Complete Registration 3 steps');
							// redirectUrl ='/auth/complete-registration';
							redirectUrl ='/company/setup';
							Swal.fire({
								title: 'Login Successful',
								text: 'Kindly Complete Company Registration',
								icon: 'success',
								timer: 3000,
							});
						} else {
							Swal.fire({
								title: 'Login Successful',
								text: message,
								icon: 'success',
								timer: 3000,
							});	
						}
					}
				} else {
					Swal.fire({
						title: 'Login Successful',
						text: message,
						icon: 'success',
						timer: 3000,
					});							
				}

				const userState = {
					role: data?.role.name.toUpperCase() ?? x.toUpperCase(),
					redirectUrl,
					id: data?.id,
					data: {
						displayName: `${data?.firstName ?? response.firstName} ${data?.lastName ?? response.lastName}`,
						photoURL: data?.profilePicture,
						email: data?.email ?? response.email,
						shortcuts: ['loan_request', 'request_leave', 'blog_list', 'todo'],
						department: data?.department,
						details: data?.info,
						employeeGrade: data?.employeeGrade
					}
				};
				localStorage.setItem('user_data', JSON.stringify(userState));
				dispatch(getProfile({ id: data?.id, token }));
				dispatch(UserActions.setUserData(userState));
				// dispatch(getNotification(token));
				dispatch(getDepartmentEmployees(data.department?.id));
				dispatch(getUserMenu({ id: data?.id, token }));
			} else {
				console.log("inside else")
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
			console.log(error)
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
	};
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
				if (data.data) {
					localStorage.setItem('user_profile', JSON.stringify(data.data));
					dispatch({
						type: GET_EMPLOYEE_PROFILE,
						payload: data.data || {}
					});
				}
			}
		)
	};

}

export const getUserMenu = ({ id, token, }) => {

	return dispatch => {
		dispatch({
			type: GET_NAVIGATION
		});
		fetch(`${getBaseUrl()}/menu`, {
			headers: {
				authorization: `JWT ${token}`
			}
		}).then(res => handleResponse(res)).then(
			data => {
				if (data.data) {
					localStorage.setItem('user_menu', JSON.stringify(data.data.menu || []));
					dispatch({
						type: SET_NAVIGATION,
						navigation: data.data.menu || []
					});
				}
			}
		)
	};

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