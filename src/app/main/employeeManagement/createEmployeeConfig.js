import React from 'react';

const createEmployeeConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/create-employee',
			component: React.lazy(() => import('./AddNewEmployee'))
		},
	]
};

export default createEmployeeConfig;
