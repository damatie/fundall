import React from 'react';

const AllocateLeaveConfig = {
	settings: {
		layout: {
			config: {
				
			}
		}
	},
	routes: [
		{
			path: '/hr/employee_leave',
			component: React.lazy(() => import('./allocateLeave'))
		}
	]
};

export default AllocateLeaveConfig;
