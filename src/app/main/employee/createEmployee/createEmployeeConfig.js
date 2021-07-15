import React from 'react';
import { authRoles } from 'app/auth';

const createEmployeeAccountConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
    // auth: authRoles.staff,
	routes: [
		{
			path: '/employee/create',
			component: React.lazy(() => import('./createEmployeeAccount'))
		}
	]
};

export default createEmployeeAccountConfig;
