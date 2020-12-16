import React from 'react';

const JobTitleConfig = {
  settings: {
		layout: {
			config: {}
		}
  },
  routes: [
    {
      path: '/jobTitle/all',
      component: React.lazy(() => import('./JobTitle'))
    }
  ]
};

export default JobTitleConfig;