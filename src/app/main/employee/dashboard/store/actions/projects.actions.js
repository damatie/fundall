import axios from 'axios';
import { projectDashboardAppDB } from './db';

export const GET_PROJECTS = '[PROJECT DASHBOARD APP] GET PROJECTS';

export function getProjects() {
	const request = axios.get('/api/project-dashboard-app/projects');

	return dispatch => {
		// request.then(response => {
			dispatch({
				type: GET_PROJECTS,
				payload: projectDashboardAppDB.projects
		// }
			});
	}
		
}
