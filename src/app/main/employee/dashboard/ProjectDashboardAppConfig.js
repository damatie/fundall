import React from 'react';
import { authRoles } from 'app/auth';

const ProjectDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	// auth: authRoles.staff,
	routes: [
		{
			path: '/employee/dashboard',
			component: React.lazy(() => import('./createEmployeeAccount'))
		},
		{
			path: '/employee/create',
			component: React.lazy(() => import('./ProjectDashboardApp'))
		}
	]
};

export default ProjectDashboardAppConfig;
