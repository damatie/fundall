import React from 'react';

const HRRecruitmentDashboardConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/recruitment',
			component: React.lazy(() => import('./Dashboard'))
		}
	]
};

export default HRRecruitmentDashboardConfig;
