import React from 'react';

const PersonalTrainingConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/training/personal',
			component: React.lazy(() => import('./personalTraining'))
		}
	]
};

export default PersonalTrainingConfig;
