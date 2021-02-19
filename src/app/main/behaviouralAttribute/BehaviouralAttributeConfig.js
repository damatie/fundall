import React from 'react';

const BehaviouralAttributeConfig = {
  settings: {
		layout: {
			config: {}
		}
  },
  routes: [
    {
      path: '/behaviouralAttribute/content/:id',
      component: React.lazy(() => import('./BehaviouralAttributeDetails'))
    },
    {
      path: '/behaviouralAttribute/all',
      component: React.lazy(() => import('./BehaviouralAttribute'))
    },

  ]
};

export default BehaviouralAttributeConfig;