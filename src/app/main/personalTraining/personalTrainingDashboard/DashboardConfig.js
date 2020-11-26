import React from 'react';

const DashboardConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/employee/training/dashboard',
			component: React.lazy(() => import('./Dashboard'))
		}
	]
};

export default DashboardConfig;