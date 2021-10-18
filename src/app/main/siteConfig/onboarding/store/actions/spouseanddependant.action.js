import loading from "utils/loading";
import api from 'app/services/api';
import swal from 'sweetalert2';

export const LOADING_SPOUSE_AND_DEPENDANT = 'LOADING SPOUSE AND DEPENDANT';

export const ADD_SPOUSE_AND_DEPENDANT_SUCCESS = 'ADD SPOUSE AND DEPENDANT SUCCESS';
export const ADD_SPOUSE_AND_DEPENDANT_ERROR = 'ADD SPOUSE AND DEPENDANT ERROR';

export const UPDATE_SPOUSE_AND_DEPENDANT_SUCCESS = 'UPDATE SPOUSE AND DEPENDANT SUCCESS';
export const UPDATE_SPOUSE_AND_DEPENDANT_ERROR = 'UPDATE SPOUSE AND DEPENDANT ERROR';

export const GET_ALL_SPOUSE_AND_DEPENDANT_SUCCESS = 'GET ALL SPOUSE AND DEPENDANT SUCCESS';
export const GET_ALL_SPOUSE_AND_DEPENDANT_ERROR = 'GET ALL SPOUSE AND DEPENDANT ERROR';

export function addSpouseAndDependant(model) {
	console.log(model)
	return async(dispatch) => {
		loading('adding...');
		try{
			dispatch({
				type: LOADING_SPOUSE_AND_DEPENDANT
			});
			const { data: { data, success, message } } = await api.post(`/dependant/bulk`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: ADD_SPOUSE_AND_DEPENDANT_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getSpouseAndDependant());
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
					type: ADD_SPOUSE_AND_DEPENDANT_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: ADD_SPOUSE_AND_DEPENDANT_ERROR,
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

export function updateSpouseAndDependant(model, ) {
	console.log(model)
	return async(dispatch) => {
		loading('updating...');
		try{
			dispatch({
				type: LOADING_SPOUSE_AND_DEPENDANT
			});
			const { data: { data, success, message } } = await api.patch(`/dependant/${model.id}`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: UPDATE_SPOUSE_AND_DEPENDANT_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getSpouseAndDependant());
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
					type: UPDATE_SPOUSE_AND_DEPENDANT_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: UPDATE_SPOUSE_AND_DEPENDANT_ERROR,
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

export function getSpouseAndDependant() {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_SPOUSE_AND_DEPENDANT
			});
			const { data: { data, success, message } } = await api.get(`/dependant/all`);
			console.log({data})
			if (success && data) {
				dispatch({
					type: GET_ALL_SPOUSE_AND_DEPENDANT_SUCCESS,
					payload: data,
				})
			} else {
				dispatch({
					type: GET_ALL_SPOUSE_AND_DEPENDANT_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ALL_SPOUSE_AND_DEPENDANT_ERROR,
				payload: [],
			})
		}
	}
}