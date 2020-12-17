import React from 'react';

const BehaviouralAttributeConfig = {
  settings: {
		layout: {
			config: {}
		}
  },
  routes: [
    {
      path: '/behaviouralAttribute/all',
      component: React.lazy(() => import('./BehaviouralAttribute'))
    }
  ]
};

export default BehaviouralAttributeConfig;