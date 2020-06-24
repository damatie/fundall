
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
import EmployeeProfilePageConfig from 'app/main/employee/profile/ProfilePageConfig';
import EmployeeOnboardingConfig from 'app/main/employee/onboarding/employeeOnboardingConfig';
import LeaveTypeConfig from 'app/main/HR/leave_type/leaveTypeConfig';
import SignatureConfig from 'app/main/employee/signature/signatureConfig';

const routeConfigs = [
	// ExampleConfig,
	HrLoginConfig,
	RegisterConfig,
	MailConfirmationPageConfig,
	EmployeeLoginConfig,
	HrConfirmConfig,
	EmployeeManagementConfig,
	EmployeeProfilePageConfig,
	EmployeeOnboardingConfig,
	LeaveTypeConfig,
	SignatureConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/example" />
	}
];

export default routes;
