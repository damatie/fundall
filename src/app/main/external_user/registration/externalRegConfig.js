import { authRoles } from 'app/auth';
import { lazy } from 'react';

const ExternalRegConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	routes: [
    {
			path: '/login/:id',
			component: lazy(() => import('./externalMailConfirm'))
		},
		{
			path: '/register',
			component: lazy(() => import('./externalReg'))
    },
    {
			path: '/login',
			component: lazy(() => import('./externalLogin'))
    },
	]
};

export default ExternalRegConfig;
