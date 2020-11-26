import React from 'react';

const LineManagerDashboardConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/line_manager/training/dashboard',
			component: React.lazy(() => import('./Dashboard'))
		}
	]
};

export default LineManagerDashboardConfig;
