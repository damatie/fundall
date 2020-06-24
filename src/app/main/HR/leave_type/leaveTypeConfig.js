import React from 'react';
import { Redirect } from 'react-router-dom';

const LeaveTypeConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/hr/leave_type/new',
			component: React.lazy(() => import('./newLeaveType'))
		},
		{
			path: '/hr/leave_type',
			component: React.lazy(() => import('./leaveType'))
		},
	]
};

export default LeaveTypeConfig;
