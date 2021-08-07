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
			component: React.lazy(() => import('./opening_management/createOpening'))
		},
		{
			path: '/recruitment/:positionId/candidate/:id',
			component: React.lazy(() => import('./candidate_management/ViewCandidate'))
		},
		{
			path: '/recruitment/position_details/:positionId',
			component: React.lazy(() => import('./opening_management/OpeningDetails'))
		},
		{
			path: '/recruitment/all',
			component: React.lazy(() => import('./opening_management/listOpenings'))
		},
	]
};

export default recruitmentConfig;
