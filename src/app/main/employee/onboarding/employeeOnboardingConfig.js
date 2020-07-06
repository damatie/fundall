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
			path: '/employee/onboarding',
			component: React.lazy(() => import('./employeeOnboarding'))
		}
	]
};

export default EmployeeOnboardingConfig;
