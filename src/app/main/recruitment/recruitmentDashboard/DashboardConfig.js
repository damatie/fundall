import React from 'react';

const HRRecruitmentDashboardConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/recruitment/dashboard',
			component: React.lazy(() => import('./Dashboard'))
		}
	]
};

export default HRRecruitmentDashboardConfig;
