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
			exact: true,
			component: React.lazy(() => import('./index'))
		},
		{
			path: '/employee-survey/survey-form',
			component: React.lazy(() => import('./survey/surveyForm'))
		},
	]
};

export default EmployeeSurveyConfig;
