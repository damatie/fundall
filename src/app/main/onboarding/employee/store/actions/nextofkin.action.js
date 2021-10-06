import loading from "utils/loading";
import api from 'app/services/api';
import swal from 'sweetalert2';

export const LOADING_NEXT_OF_KIN = 'LOADING NEXT OF KIN';

export const ADD_NEXT_OF_KIN_SUCCESS = 'ADD NEXT OF KIN SUCCESS';
export const ADD_NEXT_OF_KIN_ERROR = 'ADD NEXT OF KIN ERROR';

export const UPDATE_NEXT_OF_KIN_SUCCESS = 'UPDATE NEXT OF KIN SUCCESS';
export const UPDATE_NEXT_OF_KIN_ERROR = 'UPDATE NEXT OF KIN ERROR';

export const GET_ALL_NEXT_OF_KIN_SUCCESS = 'GET ALL NEXT OF KIN SUCCESS';
export const GET_ALL_NEXT_OF_KIN_ERROR = 'GET ALL NEXT OF KIN ERROR';

export function addNextOfKin(model) {
	console.log(model)
	return async(dispatch) => {
		loading('adding...');
		try{
			dispatch({
				type: LOADING_NEXT_OF_KIN
			});
			const { data: { data, success, message } } = await api.post(`/nok/bulk`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: ADD_NEXT_OF_KIN_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getNextOfKin());
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
					type: ADD_NEXT_OF_KIN_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: ADD_NEXT_OF_KIN_ERROR,
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

export function updateNextOfKin(model, ) {
	console.log(model)
	return async(dispatch) => {
		loading('updating...');
		try{
			dispatch({
				type: LOADING_NEXT_OF_KIN
			});
			const { data: { data, success, message } } = await api.patch(`/nok/${model.id}`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: UPDATE_NEXT_OF_KIN_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getNextOfKin());
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
					type: UPDATE_NEXT_OF_KIN_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: UPDATE_NEXT_OF_KIN_ERROR,
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

export function getNextOfKin() {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_NEXT_OF_KIN
			});
			const { data: { data, success, message } } = await api.get(`/nok`);
			console.log({data})
			if (success && data) {
				dispatch({
					type: GET_ALL_NEXT_OF_KIN_SUCCESS,
					payload: data,
				})
			} else {
				dispatch({
					type: GET_ALL_NEXT_OF_KIN_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ALL_NEXT_OF_KIN_ERROR,
				payload: [],
			})
		}
	}
}