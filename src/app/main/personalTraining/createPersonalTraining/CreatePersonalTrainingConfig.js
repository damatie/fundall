import React from 'react';

const CreatePersonalTraining = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/training/list',
			component: React.lazy(() => import('./trainingList'))
		},
		{
			path: '/training/personal/courses',
			component: React.lazy(() => import('./PersonalTrainingCourses'))
		}
	]
};

export default CreatePersonalTraining;
