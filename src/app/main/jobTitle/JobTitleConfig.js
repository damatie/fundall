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
      components: React.lazy(() => import(''))
    }
  ]
};

export default JobTitleConfig;