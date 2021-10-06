import loading from "utils/loading";
import api from 'app/services/api';
import swal from 'sweetalert2';

export const LOADING_EMPLOYEE_INFORMATION = 'LOADING EMPLOYEE INFORMATION';

export const ADD_EMPLOYEE_INFORMATION_SUCCESS = 'ADD EMPLOYEE INFORMATION SUCCESS';
export const ADD_EMPLOYEE_INFORMATION_ERROR = 'ADD EMPLOYEE INFORMATION ERROR';

export const UPDATE_EMPLOYEE_INFORMATION_SUCCESS = 'UPDATE EMPLOYEE INFORMATION SUCCESS';
export const UPDATE_EMPLOYEE_INFORMATION_ERROR = 'UPDATE EMPLOYEE INFORMATION ERROR';

export const GET_EMPLOYEE_INFORMATION_SUCCESS = 'GET ALL EMPLOYEE INFORMATION SUCCESS';
export const GET_EMPLOYEE_INFORMATION_ERROR = 'GET ALL EMPLOYEE INFORMATION ERROR';

export function addEmployeeInfo(model, goToNextStepper) {
	console.log(model)
	return async(dispatch) => {
		loading('adding...');
		try{
			dispatch({
				type: LOADING_EMPLOYEE_INFORMATION
			});
			const { data: { data, success, message } } = await api.post(`/info`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: ADD_EMPLOYEE_INFORMATION_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getEmployeeInfo());
				})
				
				swal.fire({
					title: message,
					icon: 'success'
				}).then(() => {
					goToNextStepper();
				})
			} else {
				swal.fire({
					title: 'Failed to add candidate',
					text: message,
					icon: 'error'
				})
				dispatch({
					type: ADD_EMPLOYEE_INFORMATION_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: ADD_EMPLOYEE_INFORMATION_ERROR,
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

export function updateEmployeeInfo(model, id, goToNextStepper) {
	console.log(model)
	return async(dispatch) => {
		loading('updating...');
		try{
			dispatch({
				type: LOADING_EMPLOYEE_INFORMATION
			});
			const { data: { data, success, message } } = await api.patch(`/info/${id}`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: UPDATE_EMPLOYEE_INFORMATION_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getEmployeeInfo());
				})
				
				swal.fire({
					title: message,
					icon: 'success'
				}).then(() => {
					goToNextStepper();
				})
			} else {
				swal.fire({
					title: 'Failed to add candidate',
					text: message,
					icon: 'error'
				})
				dispatch({
					type: UPDATE_EMPLOYEE_INFORMATION_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: UPDATE_EMPLOYEE_INFORMATION_ERROR,
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

export function getEmployeeInfo() {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_EMPLOYEE_INFORMATION
			});
			const { data: { infoData, success, message } } = await api.get(`/info`);
			console.log({infoData})
			if (success && infoData) {
				dispatch({
					type: GET_EMPLOYEE_INFORMATION_SUCCESS,
					payload: infoData,
				})
			} else {
				dispatch({
					type: GET_EMPLOYEE_INFORMATION_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_EMPLOYEE_INFORMATION_ERROR,
				payload: [],
			})
		}
	}
}