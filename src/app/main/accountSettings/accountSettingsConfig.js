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
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/company/setup',
			component: React.lazy(() => import('./steppermain'))
		}
	]
};

export default AuthenticationConfig;
