import loading from "utils/loading";
import api from 'app/services/api';
import swal from 'sweetalert2';

export const LOADING_EMERGENCY_CONTACT = 'LOADING EMERGENCY CONTACT';

export const ADD_EMERGENCY_CONTACT_SUCCESS = 'ADD EMERGENCY CONTACT SUCCESS';
export const ADD_EMERGENCY_CONTACT_ERROR = 'ADD EMERGENCY CONTACT ERROR';

export const UPDATE_EMERGENCY_CONTACT_SUCCESS = 'UPDATE EMERGENCY CONTACT SUCCESS';
export const UPDATE_EMERGENCY_CONTACT_ERROR = 'UPDATE EMERGENCY CONTACT ERROR';

export const GET_ALL_EMERGENCY_CONTACT_SUCCESS = 'GET ALL EMERGENCY CONTACT SUCCESS';
export const GET_ALL_EMERGENCY_CONTACT_ERROR = 'GET ALL EMERGENCY CONTACT ERROR';

export function addEmergencyContact(model) {
	console.log(model)
	return async(dispatch) => {
		loading('adding...');
		try{
			dispatch({
				type: LOADING_EMERGENCY_CONTACT
			});
			const { data: { data, success, message } } = await api.post(`/emergency_contact/bulk`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: ADD_EMERGENCY_CONTACT_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getEmergencyContact());
				})
				
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'success'
				})
			} else {
				swal.fire({
					title: 'Failed to add candidate',
					text: message,
					icon: 'error'
				})
				dispatch({
					type: ADD_EMERGENCY_CONTACT_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: ADD_EMERGENCY_CONTACT_ERROR,
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

export function updateEmergencyContact(model, ) {
	console.log(model)
	return async(dispatch) => {
		loading('updating...');
		try{
			dispatch({
				type: LOADING_EMERGENCY_CONTACT
			});
			const { data: { data, success, message } } = await api.patch(`/emergency_contact/${model.id}`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: UPDATE_EMERGENCY_CONTACT_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getEmergencyContact());
				})
				
				swal.fire({
					title: message,
					timer: 3000,
					icon: 'success'
				})
			} else {
				swal.fire({
					title: 'Failed to add candidate',
					text: message,
					icon: 'error'
				})
				dispatch({
					type: UPDATE_EMERGENCY_CONTACT_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: UPDATE_EMERGENCY_CONTACT_ERROR,
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

export function getEmergencyContact() {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_EMERGENCY_CONTACT
			});
			const { data: { data, success, message } } = await api.get(`/emergency_contact`);
			console.log({data})
			if (success && data) {
				dispatch({
					type: GET_ALL_EMERGENCY_CONTACT_SUCCESS,
					payload: data,
				})
			} else {
				dispatch({
					type: GET_ALL_EMERGENCY_CONTACT_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ALL_EMERGENCY_CONTACT_ERROR,
				payload: [],
			})
		}
	}
}