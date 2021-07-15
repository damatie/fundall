import React from 'react';
import { Redirect } from 'react-router-dom';

const EmployeeManagementConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/employee_management/employee_details/:id',
			component: React.lazy(() => import('./profile/employeeProfile'))
		},
		{
			path: '/hr/employee_management',
			component: React.lazy(() => import('./employee/manageEmployee'))
		},
	]
};

export default EmployeeManagementConfig;
