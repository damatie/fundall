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
			path: '/auth/forgot-password',
			component: React.lazy(() => import('./tabs/forgotPassword'))
		},
		{
			path: '/auth/reset-passord:id',
			component: React.lazy(() => import('./tabs/resetPassword'))
		},
		{
			path: '/auth/register',
			component: React.lazy(() => import('./register/register'))
		},
		{
			path: '/auth/login',
			component: React.lazy(() => import('./login/login'))
		},
		{
			path: '/auth/complete-registration',
			component: React.lazy(() => import('./steppers/steppermain'))
		}
	]
};

export default AuthenticationConfig;
