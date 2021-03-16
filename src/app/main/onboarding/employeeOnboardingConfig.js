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
			path: '/employee/onboarding/:formName/:id',
			component: React.lazy(() => import('./OnboardingForms'))
		},
		{
			path: '/employee/onboarding/:formName',
			component: React.lazy(() => import('./OnboardingForms'))
		},
		{
			path: '/onboarding/list',
			component: React.lazy(() => import('./EmployeeOnboardingForms'))
		},
	]
};

export default EmployeeOnboardingConfig;
