import React from 'react';

const recruitmentConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
    {
      path: '/recruitment/create_opening',
      component: React.lazy(() => import('./recruitment_management/createOpening'))
    },
    {
      path: '/recruitment/add_candidate',
      component: React.lazy(() => import('./candidate_management/addCandidate'))
    },
		{
			path: '/recruitment',
			component: React.lazy(() => import('./recruitment_management/listOpenings'))
		},
	]
};

export default recruitmentConfig;
