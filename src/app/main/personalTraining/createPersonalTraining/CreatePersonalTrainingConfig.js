import React from 'react';

const CreatePersonalTraining = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/training/personal/courses/:startDate/:endDate',
		// 	component: React.lazy(() => import('./courses/Courses'))
		// },
		{
			path: '/training/personal/courses',
			component: React.lazy(() => import('./PersonalTrainingCourses'))
		}
	]
};

export default CreatePersonalTraining;
