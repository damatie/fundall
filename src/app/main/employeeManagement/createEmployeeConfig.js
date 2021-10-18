import React from 'react';

const createEmployeeConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/createEmployee',
			component: React.lazy(() => import('./EmployeeCreation'))
		},
	]
};

export default createEmployeeConfig;
