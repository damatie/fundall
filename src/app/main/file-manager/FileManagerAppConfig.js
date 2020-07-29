import React from 'react';

const FileManagerAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/library/documents',
			component: React.lazy(() => import('./FileManagerApp'))
		}
	]
};

export default FileManagerAppConfig;
