import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import { useAuthentication } from 'app/hooks/useAuthentication';
import Swal from 'sweetalert2';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_LOADING = 'LOGIN_LOADING';

export function submitLogin(data, user) {	
	return dispatch => {
		let url = '';
		let role = '';
		let redirectUrl = '';
		if(user === 'hr') {
			url = 'https://hris-cbit.herokuapp.com/api/v1/auth/hr/login'
			role = ['HR']
			redirectUrl = '/hr/employee_management'
		}
		else if(user === 'staff') {
			url = 'https://hris-cbit.herokuapp.com/api/v1/auth/employee/login'
			role = ['staff']
			redirectUrl = '/employee/dashboard'
		}
		dispatch({
			type: LOGIN_LOADING
		})
		jwtService
			.signInWithEmailAndPassword(data, url)
			.then(user => {
				if(user.success && user.message === 'Login successful') {
					Swal.fire({
						title: 'Login',
						text: data.message,
						icon: 'success',
						timer: 3000,
					});
					const userState = {
						role: role,
						redirectUrl: redirectUrl,
						id: user.id,
						data: {
							displayName: `${user.firstName} ${user.lastName}`,
							photoURL: 'assets/images/avatars/Velazquez.jpg',
							email: user.email,
							shortcuts: ['calendar', 'mail', 'contacts', 'todo']
						}
					};
					dispatch(UserActions.setUserData(userState));
					return dispatch({
						type: LOGIN_SUCCESS
					});
				} else {
					Swal.fire({
						title: 'Login',
						text: data.message,
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
					text: 'Service unavailable',
					icon: 'error',
					timer: 3000,
				})
				return dispatch({
					type: LOGIN_ERROR,
					payload: error
				});
		});
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
