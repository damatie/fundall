import React from 'react';

const FileManagerAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/library/folders/:name/:subName',
			component: React.lazy(() => import('./folderFiles/folderFiles'))
		},
		{
			path: '/library/folders/:name',
			component: React.lazy(() => import('./subFolder/subFolder'))
		},
		{
			path: '/library/folders',
			component: React.lazy(() => import('./mainFolder/mainFolder'))
		}
	]
};

export default FileManagerAppConfig;
