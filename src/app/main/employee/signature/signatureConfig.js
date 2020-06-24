import React from 'react';

const SignatureConfig = {
	settings: {
		layout: {
			config: {
			// 	navbar: {
			// 		display: false
			// 	},
			// 	toolbar: {
			// 		display: false
			// 	},
			// 	footer: {
			// 		display: false
			// 	},
			// 	leftSidePanel: {
			// 		display: false
			// 	},
			// 	rightSidePanel: {
			// 		display: false
			// 	}
			}
		}
	},
	routes: [
		{
			path: '/employee/signature',
			component: React.lazy(() => import('./signature'))
		}
	]
};

export default SignatureConfig;
