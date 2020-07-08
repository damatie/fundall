import { authRoles } from 'app/auth';
import React from 'react';

const AuthenticationConfig = {
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
	auth: authRoles.onlyGuest,
	routes: [ 
		{
			path: '/auth/register',
			component: React.lazy(() => import('./register/register'))
		},
		{
			path: '/auth/login',
			component: React.lazy(() => import('./login/login'))
		}
	]
};

export default AuthenticationConfig;
