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
		// {
		// 	path: '/srep/trustdeed/new/:srepId',
		// 	component: React.lazy(() => import('../srep/pages/addTrustDeed'))
		// }
	]
};

export default SrepConfig;
