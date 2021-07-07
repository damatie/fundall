import axios from 'axios';
import { projectDashboardAppDB } from './db';

export const GET_WIDGETS = '[PROJECT DASHBOARD APP] GET WIDGETS';

export function getWidgets() {
	// const request = axios.get('/api/project-dashboard-app/widgets');

	return dispatch => {
		// request.then(response => {
		// 	// console.log(response)
		dispatch({
			type: GET_WIDGETS,
			payload: projectDashboardAppDB.widgets
		})
		// }
		// );
	}

}
