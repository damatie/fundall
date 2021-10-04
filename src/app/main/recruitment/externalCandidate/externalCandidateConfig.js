import { authRoles } from 'app/auth';
import React from 'react';

const ExternalCandidateConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	// auth: authRoles.onlyGuest,
	routes: [ 
		{
			path: '/recruitment/candidate/apply',
			component: React.lazy(() => import('./ExternalCandidateForm'))
		}
	]
};

export default ExternalCandidateConfig;
