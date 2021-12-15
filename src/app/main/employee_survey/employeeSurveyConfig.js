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
			path: '/employee-survey/survey-form/:id',
			component: React.lazy(() => import('./survey/surveyForm'))
		},

		{
			path: '/employee-survey/single-audience/:id',
			component: React.lazy(() => import('./audienceGroup/singleAudience'))
		},
	]
};

export default EmployeeSurveyConfig;
