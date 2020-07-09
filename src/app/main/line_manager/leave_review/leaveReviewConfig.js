import React from 'react';
import { Redirect } from 'react-router-dom';

const LeaveReviewConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/line_manager/leave_review/employee/:id',
			component: React.lazy(() => import('./leaveDetails'))
		},
    {
			path: '/line_manager/leave_review',
			component: React.lazy(() => import('./leaveReview'))
		}
	]
};

export default LeaveReviewConfig;
