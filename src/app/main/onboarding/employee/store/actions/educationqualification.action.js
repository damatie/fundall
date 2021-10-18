import loading from "utils/loading";
import api from 'app/services/api';
import swal from 'sweetalert2';

export const LOADING_EDUCATION_QUALIFICATION = 'LOADING EDUCATION QUALIFICATION';

export const ADD_EDUCATION_QUALIFICATION_SUCCESS = 'ADD EDUCATION QUALIFICATION SUCCESS';
export const ADD_EDUCATION_QUALIFICATION_ERROR = 'ADD EDUCATION QUALIFICATION ERROR';

export const UPDATE_EDUCATION_QUALIFICATION_SUCCESS = 'UPDATE EDUCATION QUALIFICATION SUCCESS';
export const UPDATE_EDUCATION_QUALIFICATION_ERROR = 'UPDATE EDUCATION QUALIFICATION ERROR';

export const GET_ALL_EDUCATION_QUALIFICATION_SUCCESS = 'GET ALL EDUCATION QUALIFICATION SUCCESS';
export const GET_ALL_EDUCATION_QUALIFICATION_ERROR = 'GET ALL EDUCATION QUALIFICATION ERROR';

export function addEducationQualification(model) {
	console.log(model)
	return async(dispatch) => {
		loading('adding...');
		try{
			dispatch({
				type: LOADING_EDUCATION_QUALIFICATION
			});
			const { data: { data, success, message } } = await api.post(`/eduQualification/bulk`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: ADD_EDUCATION_QUALIFICATION_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getEducationQualification());
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
					type: ADD_EDUCATION_QUALIFICATION_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: ADD_EDUCATION_QUALIFICATION_ERROR,
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

export function updateEducationQualification(model, ) {
	console.log(model)
	return async(dispatch) => {
		loading('updating...');
		try{
			dispatch({
				type: LOADING_EDUCATION_QUALIFICATION
			});
			const { data: { data, success, message } } = await api.patch(`/eduQualification/${model.id}`, model);
			if (success) {
				Promise.all([
					dispatch({
						type: UPDATE_EDUCATION_QUALIFICATION_SUCCESS,
						payload: data || []
					})
				]).then(() => {
					dispatch(getEducationQualification());
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
					type: UPDATE_EDUCATION_QUALIFICATION_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: UPDATE_EDUCATION_QUALIFICATION_ERROR,
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

export function getEducationQualification() {
	return async(dispatch) => {
		try{
			dispatch({
				type: LOADING_EDUCATION_QUALIFICATION
			});
			const { data: { data, success, message } } = await api.get(`/eduQualification`);
			console.log({data})
			if (success && data) {
				dispatch({
					type: GET_ALL_EDUCATION_QUALIFICATION_SUCCESS,
					payload: data,
				})
			} else {
				dispatch({
					type: GET_ALL_EDUCATION_QUALIFICATION_ERROR,
					payload: [],
				})
			}
		}catch(err){
			console.log(err);
			dispatch({
				type: GET_ALL_EDUCATION_QUALIFICATION_ERROR,
				payload: [],
			})
		}
	}
}