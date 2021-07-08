import axios from 'axios';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { useAuth } from 'app/hooks/useAuth';
import swal from 'sweetalert2';
import moment from 'moment';
import { fetchHeaders } from 'app/shared/fetchHeaders'

export const LOADING_EMPLOYEES = 'LOADING EMPLOYEES';
export const GET_EMPLOYEES = 'GET EMPLOYEES';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
const auth = useAuth;

export function getEmployees() {
	return dispatch => {
		dispatch({
			type: LOADING_EMPLOYEES
		});
		fetch(`${basUrl()}/auth/employee/`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			// console.log(data.data);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_EMPLOYEES,
						payload: data.data
					})
				:
					dispatch({
						type: GET_EMPLOYEES,
						payload: []
					})
			:
				dispatch({
					type: GET_EMPLOYEES,
					payload: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_EMPLOYEES,
				payload: []
			})
		})
	}
}
