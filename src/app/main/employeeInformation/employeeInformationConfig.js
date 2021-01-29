import React from 'react';

const EmployeeInformationConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/employee/profile/',
			component: React.lazy(() => import('./EmployeeInformation'))
		},
	]
};

export default EmployeeInformationConfig;
