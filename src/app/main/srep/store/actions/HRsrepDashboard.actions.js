import { getBaseUrl } from 'app/shared/getBaseUrl';
// import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import {formatCurrency} from 'app/shared/formatCurrency';
import swal from 'sweetalert2';

export const LOADING_DASHBOARD_SREP = 'LOADING DASHBOARD SREP';
export const GET_DASHBOARD_SREP_SUCCESS = 'GET DASHBOARD SREP SUCCESS';
export const GET_DASHBOARD_SREP_ERROR = 'GET DASHBOARD SREP ERROR';
export const LOADING_DEPARTMENTS = 'LOADING DEPARTMENTS';
export const GET_DEPARTMENTS_SUCCESS = 'GET DEPARTMENTS SUCCESS';
export const GET_DEPARTMENTS_ERROR = 'GET DEPARTMENTS ERROR';
export const LOADING_DASHBOARD_EMPLOYEE_SREP = 'LOADING DASHBOARD EMPLOYEE SREP';
export const GET_DASHBOARD_EMPLOYEE_SREP_SUCCESS = 'GET DASHBOARD EMPLOYEE SREP SUCCESS';
export const GET_DASHBOARD_EMPLOYEE_SREP_ERROR = 'GET DASHBOARD EMPLOYEE SREP ERROR';
export const LOADING_DASHBOARD_ID_SREP = 'LOADING DASHBOARD ID SREP';
export const GET_DASHBOARD_SREP_ID_SUCCESS = 'GET DASHBOARD ID SREP SUCCESS';
export const GET_DASHBOARD_SREP_ID_ERROR = 'GET DASHBOARD ID SREP ERROR';
export const DASHBOARD_ENTITIES_LOADING = 'DASHBOARD ENTITIES LOADING';
export const GET_DASHBOARD_ENTITIES_ERROR = 'GET DASHBOARD ENTITIES ERROR';
export const GET_DASHBOARD_ENTITIES_SUCCESS = 'GET DASHBOARD ENTITIES SUCCESS';


const baseUrl = getBaseUrl;
const headers = fetchHeaders();
// const auth = useAuth; 

export function getDashboardSrep(role = null) {
	console.log('getDashboardSrep called');
	return dispatch => {
		dispatch({
			type: LOADING_DASHBOARD_SREP
		});
		fetch(`${baseUrl()}/srep`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
                console.log('getDashboardSrep success data up', data);
				let srep = [];
				let count = 0;
				let items = [];
				if (data.success && data.data) {
					console.log({role})
					if(role && role !== 'HR MANAGER'){
						items = data.data && data.data.filter(srep => srep.status !== 'pending');
					}else{
						items = data.data
					}
					srep = data.data && data.data.map(srep => {
						count++;
						return {
							sn: count,
							id: srep.id,
							name: `${srep.employee.firstName} ${srep.employee.lastName}`,
							status: srep.status,
							entity: srep.entityId,	
							department: srep.departmentId,
							capitalFund: formatCurrency('₦', srep.capitalFund),
							beneficiaryName: srep.beneficiaryName,
							beneficiaryRelationship: srep.beneficiaryRelationship.toUpperCase(),
							beneficiaryNationality: srep.beneficiaryNationality,
							beneficiaryGender: srep.beneficiaryGender,	
							beneficiaryEmail: srep.beneficiaryEmail
						}
					});
					console.log({srep});
					dispatch({
						type: GET_DASHBOARD_SREP_SUCCESS,
						payload: {
							data: items,
							srepData: srep
						},
					})
				} else {
					dispatch({
						type: GET_DASHBOARD_SREP_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_DASHBOARD_SREP_ERROR,
					payload: [],
				})
			})
	}
}

export function getDashboardSrepByEmployeeID(id) {

	return dispatch => {
		dispatch({
			type: LOADING_DASHBOARD_EMPLOYEE_SREP
		});
		fetch(`${baseUrl()}/srep/employee/${id}`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
				let enrollmentList = [];
				if (data.success && data.data) {
					enrollmentList = data.data.map(srep => {
						return {
							id: srep.id,
							name: `${srep.employee.firstName} ${srep.employee.lastName}`,
							status: srep.status,
							entity: srep.entityId,	
							department: srep.departmentId,
							capitalFund: formatCurrency('₦', srep.capitalFund),
							beneficiaryName: srep.beneficiaryName,
							beneficiaryRelationship: srep.beneficiaryRelationship.toUpperCase(),
							beneficiaryNationality: srep.beneficiaryNationality,
							beneficiaryGender: srep.beneficiaryGender,	
							beneficiaryEmail: srep.beneficiaryEmail 
						}
					});
					dispatch({
						type: GET_DASHBOARD_EMPLOYEE_SREP_SUCCESS,
						payload: {
							data: data.data,
							enrollmentList: enrollmentList
						},
					})
				} else {
					dispatch({
						type: GET_DASHBOARD_EMPLOYEE_SREP_ERROR,
						payload: [],
					})
				}
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_DASHBOARD_EMPLOYEE_SREP_ERROR,
					payload: [],
				})
			})
	}
}

export function getDashboardSrepByID(id) {
	console.log('getDashboardSrepByID: ', id);
	return dispatch => {
		dispatch({
			type: LOADING_DASHBOARD_SREP_ID
		});
		fetch(`${baseUrl()}/srep/${id}`, { ...headers.getRegHeader() })
		.then(res => res.json()).then(async data => {
			console.log(data);
			let enrollmentDataById = [];
				if (data.success && data.data) {
					enrollmentDataById = data.data.map(srep => {
						return {
							id: srep.id,
							name: `${srep.employee.firstName} ${srep.employee.lastName}`,
							status: srep.status,
							entity: srep.entityId,	
							department: srep.departmentId,
							capitalFund: formatCurrency('₦', srep.capitalFund),
							beneficiaryName: srep.beneficiaryName,
							beneficiaryRelationship: srep.beneficiaryRelationship.toUpperCase(),
							beneficiaryNationality: srep.beneficiaryNationality,
							beneficiaryGender: srep.beneficiaryGender,	
							beneficiaryEmail: srep.beneficiaryEmail 
						}
					});
					dispatch({
						type: GET_DASHBOARD_SREP_ID_SUCCESS,
						payload: {
							data: data.data,
							enrollmentDataById: enrollmentDataById
						},
					})
			} else {
				swal.fire(
					'Oops!',
					data.message,
					'error'
				)
				return dispatch({
					type: GET_DASHBOARD_SREP_ID_ERROR,
					payload: [],
				})
			}
		}).catch(err => {
			console.log(err);
			swal.fire(
				'Oops!',
				'something went wrong',
				'error'
			)
			return dispatch({
				type: GET_DASHBOARD_SREP_ID_ERROR,
				payload: [],
			})
		})
	}
}


export function getDepartments(id) {
	return dispatch => {
		fetch(`${basUrl()}/department/all/${id}`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(data => {
				data.success ?
					dispatch({
						type: GET_DEPARTMENTS_SUCCESS,
						payload: data.data
					})
					:
					dispatch({
						type: GET_DEPARTMENTS_ERROR,
						payload: []
					})
			}).catch(err => {
				console.log(err);
				dispatch({
					type: GET_DEPARTMENTS_ERROR,
					payload: [],
				})
			})
	}
}

export function getEntities() {
	return dispatch => {
	  dispatch({
		type: DASHBOARD_ENTITIES_LOADING
	  })
	  fetch(`${getBaseUrl()}/entity/all`, {
		...header.getRegHeader()
	  }).then(res => res.json()).then(
		data => {
		  console.log(data)
		  if(data.success) {
			dispatch({
			  type: GET_DASHBOARD_ENTITIES_SUCCESS,
			  payload: data.data
			});
		  } else {
			dispatch({
			  type: GET_DASHBOARD_ENTITIES_ERROR,
			  payload: []
			})
		  }
		}
	  ).catch(e => {
		dispatch({
		  type: GET_DASHBOARD_ENTITIES_ERROR,
		  payload: []
		})
		console.error(e)
	  })
	}
  }
