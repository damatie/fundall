import { getBaseUrl } from 'app/shared/getBaseUrl';
// import { useAuth } from 'app/hooks/useAuth';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import {formatCurrency} from 'app/shared/formatCurrency';
import swal from 'sweetalert2';

export const LOADING_DASHBOARD_SREP = 'LOADING DASHBOARD SREP';
export const GET_DASHBOARD_SREP_SUCCESS = 'GET DASHBOARD SREP SUCCESS';
export const GET_DASHBOARD_SREP_ERROR = 'GET DASHBOARD SREP ERROR';

const baseUrl = getBaseUrl;
const headers = fetchHeaders();
// const auth = useAuth; 

export function getSrep(role = null) {
	return dispatch => {
		dispatch({
			type: LOADING_DASHBOARD_SREP
		});
		fetch(`${baseUrl()}/srep`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
                console.log(data);
				let srep = [];
				let count = 0;
				let items = [];
				if (data.success && data.data) {
					console.log(data.data);
					console.log({role})
					if(role && role !== 'HR MANAGER'){
						items = data.data && data.data.filter(srep => srep.status !== 'pending');
					}else{
						items = data.data
					}
					srep = data.data && data.data.map(srep => {
						count++;
						return {
							id: srep.id,
							sn: count,
							name: srep.beneficiaryName,
							relationship: srep.beneficiaryRelationship.toUpperCase(),
							fund: formatCurrency('₦', srep.capitalFund),
							status: srep.status
						}
					});
					console.log({srep});
					dispatch({
						type: GET_DASHBOARD_SREP_SUCCESS,
						payload: {
							data: items,
							srep: srep
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

export function getSrepByEmployeeID(id) {
	return dispatch => {
		dispatch({
			type: LOADING_DASHBOARD_SREP
		});
		fetch(`${baseUrl()}/srep/employee/${id}`, { ...headers.getRegHeader() })
			.then(res => res.json()).then(async data => {
                console.log(data);
				let srep = [];
				let count = 0;
				if (data.success && data.data) {
					console.log(data.data);
					srep = data.data && data.data.map(srep => {
						count++;
						return {
							id: srep.id,
							sn: count,
							name: srep.beneficiaryName,
							relationship: srep.beneficiaryRelationship.toUpperCase(),
							fund: formatCurrency('₦', srep.capitalFund),
							status: srep.status
						}
					});
					console.log({srep});
					dispatch({
						type: GET_DASHBOARD_SREP_SUCCESS,
						payload: {
							data: data.data,
							srep: srep
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

export function getSrepByID(id = 0) {
	return dispatch => {
		dispatch({
			type: LOADING_DASHBOARD_SREP
		});
		fetch(`${baseUrl()}/srep/${id}`, { ...headers.getRegHeader() })
		.then(res => res.json()).then(async data => {
			console.log(data);
			if (data.success && data.data) {
				return dispatch({
					type: GET_DASHBOARD_SREP_SUCCESS,
					payload: data.data,
				})
			} else {
				swal.fire(
					'Oops!',
					data.message,
					'error'
				)
				return dispatch({
					type: GET_DASHBOARD_SREP_ERROR,
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
				type: GET_DASHBOARD_SREP_ERROR,
				payload: [],
			})
		})
	}
}
