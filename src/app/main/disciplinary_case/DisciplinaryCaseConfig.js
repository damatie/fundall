import React from 'react';

const DesciplinaryCaseConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/hr/disciplinary/case/detail/:id',
			component: React.lazy(() => import('./details/DisciplinaryCaseDetail'))
		},
		{
			path: '/hr/disciplinary/case',
			component: React.lazy(() => import('./DisciplinaryCase'))
		},
		// {
		// 	path: '/library/document/:id',
		// 	component: React.lazy(() => import('./files/FileManagerApp'))
		// }
	]
};

export default DesciplinaryCaseConfig;
