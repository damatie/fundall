import React from 'react';
import { authRoles } from 'app/auth';

const EmployeeOnboardingConfig = {
	settings: {
		layout: {
			config: {
			
			}
		}
	},
	routes: [
		{
			path: '/employee/complete/registration/',
			component: React.lazy(() => import('./CompleteRegistration'))
		},
		{
			path: '/employee/onboarding',
			component: React.lazy(() => import('./employeeOnboarding'))
		},
	]
};

export default EmployeeOnboardingConfig;
