import React from 'react';

const CheckListConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/training/checklist/form/:checkListID/:trainingID',
			component: React.lazy(() => import('./forms/PreLearningForm'))
		},
		{
			path: '/training/checklist/question/answers',
			component: React.lazy(() => import('./answers/answerList'))
		},
		{
			path: '/training/checklist/questions/:type/:id',
			component: React.lazy(() => import('./question/Question'))
		},
		{
			path: '/training/checklist',
			component: React.lazy(() => import('./CheckList'))
		}
	]
};

export default CheckListConfig;
