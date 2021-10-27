import React from 'react';

const EmployeeSurveyConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/employeeSurvey',
			component: React.lazy(() => import('./index'))
		},
	]
};

export default EmployeeSurveyConfig;
