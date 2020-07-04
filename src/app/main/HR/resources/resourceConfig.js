import React from 'react';
import { Redirect } from 'react-router-dom';

const ResourcesConfig = {
	settings: {
		layout: {}
	},
	routes: [
    {
			path: '/hr/resources/:id',
			component: React.lazy(() => import('./resource'))
		},
		{
			path: '/hr/resources/new',
			component: React.lazy(() => import('./resource'))
		},
		{
			path: '/hr/resources',
			component: React.lazy(() => import('./resources'))
		},
	]
};

export default ResourcesConfig;
