import React from 'react';
import { Redirect } from 'react-router-dom';

const RolesConfig = {
	settings: {
		layout: {}
	},
	routes: [
    {
			path: '/hr/roles/roles&permission/:id',
			component: React.lazy(() => import('./rolesPermissions'))
		},
		{
			path: '/hr/roles/new',
			component: React.lazy(() => import('./role'))
		},
		{
			path: '/hr/roles',
			component: React.lazy(() => import('./roles'))
		},
	]
};

export default RolesConfig;
