import React from 'react';

const PersonalTrainingConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/training/personal/preForm',
			component: React.lazy(() => import('./forms/PreLearningForm'))
		},
		{
			path: '/training/personal',
			component: React.lazy(() => import('./personalTraining'))
		},
	]
};

export default PersonalTrainingConfig;
