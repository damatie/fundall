import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import { useAuthentication } from 'app/hooks/useAuthentication';
import swal from 'sweetalert2';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_LOADING = 'REGISTER_LOADING';

export function submitRegister(data) {

	return dispatch => {
		dispatch({
			type: REGISTER_LOADING
		})
		const reg = {
			body: data,
			origin: window.location.host
		}
		useAuthentication('hr_signup', reg).then(data => {
			if(data.success && data.message !== "Accout already exist") {
				swal.fire({
					title: 'Sign up',
					text: data.message,
					icon: 'success',
					timer: 2000
				})
				dispatch({
					type: REGISTER_SUCCESS
				})
			} else {
				swal.fire({
					title: 'Sign up',
					text: data.message,
					icon: 'info',
					timer: 2000
				})
				return dispatch({
					type: REGISTER_ERROR,
				payload: 'error'
				})
				
			}
			
		}).catch(error => {
			return dispatch({
				type: REGISTER_ERROR,
				payload: error
			});
		});
	}
}

export function registerWithFirebase(model) {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}

	const { email, password, displayName } = model;
	return dispatch =>
		firebaseService.auth
			.createUserWithEmailAndPassword(email, password)
			.then(response => {
				dispatch(
					UserActions.createUserSettingsFirebase({
						...response.user,
						displayName,
						email
					})
				);

				return dispatch({
					type: REGISTER_SUCCESS
				});
			})
			.catch(error => {
				const usernameErrorCodes = ['auth/operation-not-allowed', 'auth/user-not-found', 'auth/user-disabled'];

				const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

				const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

				const response = {
					email: emailErrorCodes.includes(error.code) ? error.message : null,
					displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
					password: passwordErrorCodes.includes(error.code) ? error.message : null
				};

				if (error.code === 'auth/invalid-api-key') {
					dispatch(Actions.showMessage({ message: error.message }));
				}

				return dispatch({
					type: REGISTER_ERROR,
					payload: response
				});
			});
}
