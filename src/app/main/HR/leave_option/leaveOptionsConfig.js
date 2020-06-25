import React from 'react';
import { Redirect } from 'react-router-dom';

const LeaveOptionsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/leave_options/new',
			component: React.lazy(() => import('./leaveOption'))
		},
		{
			path: '/hr/leave_options',
			component: React.lazy(() => import('./leaveOptions'))
		},
	]
};

export default LeaveOptionsConfig;
