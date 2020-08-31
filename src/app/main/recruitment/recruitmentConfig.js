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
      component: React.lazy(() => import('./createOpening'))
    },
		{
			path: '/recruitment',
			component: React.lazy(() => import('./recruitment'))
		},
	]
};

export default recruitmentConfig;
