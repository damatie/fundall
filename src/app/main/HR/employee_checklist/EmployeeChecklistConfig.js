import React from 'react';
import { Redirect } from 'react-router-dom';

const EmployeeChecklistConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/employee_checklist',
			component: React.lazy(() => import('./EmployeeChecklist'))
		},
	]
};

export default EmployeeChecklistConfig;
