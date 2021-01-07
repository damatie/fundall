
import { authRoles } from 'app/auth';
import Login from './login';

const EmployeeLoginConfig = {
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
			path: '/employee/login',
			component: Login
		}
	]
};

export default EmployeeLoginConfig;
