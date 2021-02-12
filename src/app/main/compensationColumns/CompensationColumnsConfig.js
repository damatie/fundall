import React from 'react';

const BehaviouralAttributeConfig = {
  settings: {
		layout: {
			config: {}
		}
  },
  routes: [
    {
      path: '/compensation/columns',
      component: React.lazy(() => import('./CompensationColumns'))
    },
  ]
};

export default BehaviouralAttributeConfig;