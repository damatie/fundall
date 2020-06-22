
import { authRoles } from 'app/auth';
import HrConfirmPage from './hrConfirm';

const HrConfirmConfig = {
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
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/hr/confirmation/',
			component: HrConfirmPage
		}
	]
};

export default HrConfirmConfig;
