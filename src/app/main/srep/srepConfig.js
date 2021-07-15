import React from 'react';

const SrepConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/srep/all',
			component: React.lazy(() => import('./srep'))
		},
		{
			path: '/srep/apply',
			component: React.lazy(() => import('../srep/forms/createForm'))
		},
		{
			path: '/srep/details/:srepId',
			component: React.lazy(() => import('../srep/viewSrep'))
		},
		{
			path: '/srep/myapplications',
			component: React.lazy(() => import('./dashboards/EmployeeSrepDashboard'))
		},
		{
			path: '/srep/admin/dashboard',
			component: React.lazy(() => import('./dashboards/HRsrepDashboard'))
		},
		{
			path: '/srep/finance/dashboard',
			component: React.lazy(() => import('./dashboards/FinanceSrepDashboard'))
		}
	]
};

export default SrepConfig;
