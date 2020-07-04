import React from 'react';
import { Redirect } from 'react-router-dom';

const OnboardingConfig  = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/employee_onboarding_list/employee/:id',
			component: React.lazy(() => import('./onboardingForms'))
		},
		{
			path: '/hr/employee_onboarding_list',
			component: React.lazy(() => import('./onboarding'))
		},
		// {
		// 	path: '/apps/e-commerce/orders/:orderId',
		// 	component: React.lazy(() => import('./order/Order'))
		// },
		// {
		// 	path: '/apps/e-commerce/orders',
		// 	component: React.lazy(() => import('./orders/Orders'))
		// },
		// {
		// 	path: '/apps/e-commerce',
		// 	component: () => <Redirect to="/apps/e-commerce/products" />
		// }
	]
};

export default OnboardingConfig;
