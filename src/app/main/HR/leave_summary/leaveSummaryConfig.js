import React from 'react';
import { Redirect } from 'react-router-dom';

const LeaveSumamaryConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/leave_summary',
			component: React.lazy(() => import('./leaveSummary'))
		},
	]
};

export default LeaveSumamaryConfig;
