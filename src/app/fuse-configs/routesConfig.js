
import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
// import ExampleConfig from 'app/main/example/ExampleConfig.js';
import HrLoginConfig from 'app/main/HR/registration/loginConfig';
import RegisterConfig from 'app/main/HR/registration/registerConfig';
import MailConfirmationPageConfig from 'app/main/HR/registration/MailConfirmPageConfig';
import EmployeeLoginConfig from 'app/main/employee/registration/employeeLoginConfig';
import HrConfirmConfig from 'app/main/HR/registration/hrConfirmConfig';
import EmployeeManagementConfig from 'app/main/HR/employee_management/employeeManagementConfig';

const routeConfigs = [
	// ExampleConfig,
	HrLoginConfig,
	RegisterConfig,
	MailConfirmationPageConfig,
	EmployeeLoginConfig,
	HrConfirmConfig,
	EmployeeManagementConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/example" />
	}
];

export default routes;
