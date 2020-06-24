import React from 'react';

const EmployeeProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/employee/profile',
			component: React.lazy(() => import('./ProfilePage'))
		}
	]
};

export default EmployeeProfilePageConfig;
