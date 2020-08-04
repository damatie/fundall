import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import {fetchHeaders} from 'app/shared/fetchHeaders'

export const LOADING_COURSES = 'LOADING COURSES';
export const LOADING_COURSE_CATEGORIES = 'LOADING COURSE CATEGORIES';
export const GET_APPROVED_COURSES = 'GET APPROVED COURSES';
export const GET_REJECTED_COURSES = 'GET REJECTED COURSES';
export const GET_PENDING_COURSES = 'GET PENDING COURSES';
export const GET_COURSE_CATEGORIES = 'GET COURSE CATEGORIES';
export const APPROVE_COURSES_SUCCESS = 'APPROVE COURSES SUCCESS';
export const APPROVE_COURSES_ERROR = 'APPROVE COURSES ERROR';
export const REJECT_COURSES_SUCCESS = 'REJECT COURSES SUCCESS';
export const REJECT_COURSES_ERROR = 'REJECT COURSES ERROR';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
export function getApprovedCourses() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSES
		});
		fetch(`${basUrl()}/training/courses/all/approved`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_APPROVED_COURSES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_APPROVED_COURSES,
						payload: []
					})
			:
				dispatch({
					type: GET_APPROVED_COURSES,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_APPROVED_COURSES,
				payload: []
			})
		})
	}
}

export function getRejectedCourses() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSES
		});
		fetch(`${basUrl()}/training/courses/all/rejected`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_REJECTED_COURSES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_REJECTED_COURSES,
						payload: []
					})
			:
				dispatch({
					type: GET_REJECTED_COURSES,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_REJECTED_COURSES,
				payload: []
			})
		})
	}
}

export function getPendingCourses() {
	return dispatch => {
		dispatch({
			type: LOADING_COURSES
		});
		fetch(`${basUrl()}/training/courses/all/pending`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_PENDING_COURSES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_PENDING_COURSES,
						payload: []
					})
			:
				dispatch({
					type: GET_PENDING_COURSES,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_PENDING_COURSES,
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
			swal.fire(
                'Oops!',
                'something went wrong',
                'error'
              )
		})
	}
}