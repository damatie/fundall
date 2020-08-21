import React from 'react';

const FileManagerAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/library/categories',
			component: React.lazy(() => import('./documentCategories/DocumentCategories'))
		},
		{
			path: '/library/documents',
			component: React.lazy(() => import('./FilesByCategories'))
		},
		{
			path: '/library/document/:id',
			component: React.lazy(() => import('./files/FileManagerApp'))
		}
	]
};

export default FileManagerAppConfig;
