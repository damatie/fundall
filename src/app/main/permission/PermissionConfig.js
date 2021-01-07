import React from 'react';

const PermissionConfig = {
  settings: {
		layout: {
			config: {}
		}
	},
	routes: [
    {
      path: '/roles/permissions',
      component: React.lazy(() => import('./Permission')),
    }
  ],
}

export default PermissionConfig;