import React from 'react';

const EmployeeSurveyConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/employee-survey',
			component: React.lazy(() => import('./index'))
		},
	]
};

export default EmployeeSurveyConfig;
