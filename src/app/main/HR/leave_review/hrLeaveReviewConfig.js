import React from 'react';

const HrLeaveReviewConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
			path: '/hr/leave_review/employee/:id',
			component: React.lazy(() => import('./hrLeaveReviewDetails'))
		},
    {
      path: '/hr/leave_review',
      component: React.lazy(() => import('./hrLeaveReview'))
    }
  ]
};

export default HrLeaveReviewConfig