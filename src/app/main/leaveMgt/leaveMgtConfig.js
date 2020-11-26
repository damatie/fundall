import React from 'react';

const LeaveMgtConfig = {
  settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/leave/dashboard',
			component: React.lazy(() => import('./dashboards/HrLeaveMgtDashboard'))
		},
		{
			path: '/line_manager/leave/dashboard',
			component: React.lazy(() => import('./dashboards/LMLeaveMgtDashboard'))
		},
	]
}

export default LeaveMgtConfig;