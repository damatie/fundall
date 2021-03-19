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
				let countEmployees = 0;
            	let empList = [];
				let items = [];
				const monthNames = ["January", "February", "March", "April", "May", "June",
									"July", "August", "September", "October", "November", "December" ];
				let pendingList = [];
				let rejectedList = [];
				let approvedList = [];

				if (data.success && data.data) {
					items = data.data
					srep =  data.data.map(srep => {
						count++;
						const monthValue = new Date(srep.createdAt).getMonth() + 1;
						if ((srep.employee !== null) && !(empList.includes(srep.employee.email))) {
							countEmployees++;
							empList.push(srep.employee.email);
						}
						if (srep.status.toUpperCase() === "PENDING") {
							const pendingObj = { id: srep.id, status: "PENDING", year: new Date(srep.createdAt).getFullYear(), month: monthNames[monthValue], date: srep.createdAt, 
												entity: (srep.employee) ? (srep.employee.entityName ? srep.employee.entityName : '') : '',	
												department: (srep.employee) ? (srep.employee.departmentName ? srep.employee.departmentName : '') : '', };
							pendingList.push(pendingObj);
						}
						if (srep.status.toUpperCase() === "REJECTED") {
							const rejectedObj = { id: srep.id, status: "REJECTED", year: new Date(srep.createdAt).getFullYear(), month: monthNames[monthValue], date: srep.createdAt, 
												entity: (srep.employee) ? (srep.employee.entityName ? srep.employee.entityName : '') : '',	
												department: (srep.employee) ? (srep.employee.departmentName ? srep.employee.departmentName : '') : '', };
							rejectedList.push(rejectedObj);							
						}
						if (srep.status.toUpperCase() === "APPROVED") {
							const approvedObj = { id: srep.id, status: "APPROVED", year: new Date(srep.createdAt).getFullYear(), month: monthNames[monthValue], date: srep.createdAt, 
												entity: (srep.employee) ? (srep.employee.entityName ? srep.employee.entityName : '') : '',	
												department: (srep.employee) ? (srep.employee.departmentName ? srep.employee.departmentName : '') : '', };
							approvedList.push(approvedObj);							
						}
						return {
							sn: count,
							id: srep.id,
							name: (srep.employee) ? `${srep?.employee.firstName} ${srep?.employee.lastName}` : '',
							status: srep.status,
							entity: (srep.employee) ? (srep.employee.entityName ? srep.employee.entityName : '') : '',	
							department: (srep.employee) ? (srep.employee.departmentName ? srep.employee.departmentName : '') : '',
							capitalFund: formatCurrency('₦', srep.capitalFund),
							beneficiaryName: srep.beneficiaryName,
							beneficiaryRelationship: srep.beneficiaryRelationship.toUpperCase(),
							beneficiaryNationality: srep.beneficiaryNationality,
							beneficiaryGender: srep.beneficiaryGender,	
							beneficiaryEmail: srep.beneficiaryEmail,
							beneficiaryPhone: srep.beneficiaryPhone,
							createdAt: srep.createdAt,
							employeePhoneNo: srep.phoneNo,
							employeeEmail: (srep.employee) ? srep.employee.email : null
						}
					});
					console.log('srep payload: ', {
						data: items,
						srepData: srep,
						countEmployees,
						pendingList,
						rejectedList,
						approvedList
					});
					dispatch({
						type: GET_DASHBOARD_SREP_SUCCESS,
						payload: {
							data: items,
							srepData: srep,
							countEmployees,
							pendingList,
							rejectedList,
							approvedList
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
			.then(res => res.json()).then(async employeeData => {
				let enrollmentList = [];
				if (employeeData.success && employeeData.data) {
					enrollmentList = employeeData.data.map(srep => {
						return {
							id: srep.id,
							name: `${srep.employee.firstName} ${srep.employee.lastName}`,
							status: srep.status,
							entity: srep.employee.entityId,	
							department: srep.employee.departmentId,
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
							data: employeeData.data,
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
		.then(res => res.json()).then(async IdData => {
			console.log('IdData: ', IdData);
			let enrollmentDataById = [];
				if (IdData.success && IdData.data) {
					enrollmentDataById =  IdData.data && IdData.data.map(srep => {
						return {
							id: srep.id,
							name: `${srep.employee.firstName} ${srep.employee.lastName}`,
							status: srep.status,
							entity: srep.employee.entityId,	
							department: srep.employee.departmentId,
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
							data: IdData.data,
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


// export function getDepartments(id) {
// 	return dispatch => {
// 		fetch(`${basUrl()}/department/all/${id}`, { ...headers.getRegHeader() })
// 			.then(res => res.json()).then(departments => {
// 				departments.success ?
// 					dispatch({
// 						type: GET_DEPARTMENTS_SUCCESS,
// 						payload: departments.data
// 					})
// 					:
// 					dispatch({
// 						type: GET_DEPARTMENTS_ERROR,
// 						payload: []
// 					})
// 			}).catch(err => {
// 				console.log(err);
// 				dispatch({
// 					type: GET_DEPARTMENTS_ERROR,
// 					payload: [],
// 				})
// 			})
// 	}
// }

// export function getEntities() {
// 	return dispatch => {
// 	  dispatch({
// 		type: DASHBOARD_ENTITIES_LOADING
// 	  })
// 	  fetch(`${baseUrl()}/entity/all`, { ...headers.getRegHeader() })
// 	  	.then(res => res.json()).then(entities => {
// 				console.log('entity data: ', entities)
// 				if(entities.success) {
// 					dispatch({
// 					type: GET_DASHBOARD_ENTITIES_SUCCESS,
// 					payload: entities.data
// 					});
// 				} else {
// 					dispatch({
// 					type: GET_DASHBOARD_ENTITIES_ERROR,
// 					payload: []
// 					})
// 				}
// 			}
// 		).catch(e => {
// 			dispatch({
// 				type: GET_DASHBOARD_ENTITIES_ERROR,
// 				payload: []
// 			})
// 			console.error(e)
// 		})
// 	}
//   }
