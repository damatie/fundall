import React from 'react';
import { Redirect } from 'react-router-dom';

const BusinessUnitsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/business_unit/details/:id/department/new/',
			component: React.lazy(() => import('./department/department'))
		},
		{
			path: '/hr/business_unit/department/details/:id',
			component: React.lazy(() => import('./department/department_details/departmentDetails'))
		},
		{
			path: '/hr/business_unit/details/:id',
			component: React.lazy(() => import('./businessUnit'))
		},
		{
			path: '/hr/business_unit/new',
			component: React.lazy(() => import('./businessUnit'))
		},
		{
			path: '/hr/business_unit',
			component: React.lazy(() => import('./businessUnits'))
		},
	]
};

export default BusinessUnitsConfig;
