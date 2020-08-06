import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const GET_CATEGORIES = '[ACADEMY APP] GET CATEGORIES';
export const LOADING_COURSES = 'LOADING COURSES';
export const LOADING_COURSE_CATEGORIES = 'LOADING COURSE CATEGORIES';
export const GET_COURSES = 'GET COURSES';
export const GET_COURSE_CATEGORIES = 'GET COURSE CATEGORIES';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
export function getApprovedCourses() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSES
		});
		fetch(`${basUrl()}/training/courses/all/approved`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			// console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_COURSES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_COURSES,
						payload: []
					})
			:
				dispatch({
					type: GET_COURSES,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_COURSES,
				payload: []
			})
		})
	}
}

export function getCourseCategories() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSE_CATEGORIES
		});
		fetch(`${basUrl()}/training/category`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			// console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_COURSE_CATEGORIES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_COURSE_CATEGORIES,
						payload: []
					})
			:
				dispatch({
					type: GET_COURSE_CATEGORIES,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_COURSE_CATEGORIES,
				payload: []
			})
		})
	}
}