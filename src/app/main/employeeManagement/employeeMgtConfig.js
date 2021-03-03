import React from 'react';

const EmployeeMgtConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/employee_management/:id',
			component: React.lazy(() => import('../employeeInformation/EmployeeInformation'))
		},
		{
			path: '/employee_management/',
			component: React.lazy(() => import('./Employees'))
		},
	]
};

export default EmployeeMgtConfig;
