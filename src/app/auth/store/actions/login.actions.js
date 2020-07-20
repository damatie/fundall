import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import { useAuthentication } from 'app/hooks/useAuthentication';
import Swal from 'sweetalert2';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { redirectUrl } from '../../redirectUrl';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_LOADING = 'LOGIN_LOADING';


const header = fetchHeaders();
export function submitLogin(data) {	
	return dispatch => {
		dispatch({
			type: LOGIN_LOADING
		})
		fetch('https://hris-cbit.herokuapp.com/api/v1/auth/employee/login', {
			...header.reqHeader(
				'post',
				data
			)
		}).then(res => res.json()).then(
			user => {
				if(user.success) {
					// console.log(user)
					Swal.fire({
						title: 'Login',
						text: user.message,
						icon: 'success',
						timer: 3000,
					});
					localStorage.setItem('jwt_access_token', user.token);
					const userState = {
						role: user.role,
						redirectUrl: redirectUrl(user.role),
						id: user.id,
						data: {
							displayName: `${user.firstName} ${user.lastName}`,
							photoURL: 'assets/images/avatars/Velazquez.jpg',
							email: user.email,
							shortcuts: ['loan_request', 'request_leave', 'blog', 'todo']
						}
					};
					dispatch(UserActions.setUserData(userState));
					return dispatch({
						type: LOGIN_SUCCESS
					});
				} else {
					Swal.fire({
						title: 'Login',
						text: user.message,
						icon: 'error',
						timer: 3000,
					})
					return dispatch({
						type: LOGIN_ERROR,
						payload: ''
					});
				}
			}
		)
		.catch(error => {
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
