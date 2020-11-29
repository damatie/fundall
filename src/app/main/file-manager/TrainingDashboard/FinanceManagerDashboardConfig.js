
import React from 'react';

const FinanceManagerDashboardConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/finance_manager/training/dashboard',
			component: React.lazy(() => import('./Dashboard'))
		}
	]
};

export default FinanceManagerDashboardConfig;
