import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
// import ExampleConfig from 'app/main/example/ExampleConfig.js';
import BlogConfig from 'app/main/blog_app/blogConfig';
import HrLoginConfig from 'app/main/HR/registration/loginConfig';
import RegisterConfig from 'app/main/HR/registration/registerConfig';
import MailConfirmationPageConfig from 'app/main/HR/registration/MailConfirmPageConfig';
import EmployeeLoginConfig from 'app/main/employee/registration/employeeLoginConfig';
import HrConfirmConfig from 'app/main/HR/registration/hrConfirmConfig';
import EmployeeManagementConfig from 'app/main/HR/employee_management/employeeManagementConfig';
import EmployeeProfilePageConfig from 'app/main/employee/profile/ProfilePageConfig';
import EmployeeOnboardingConfig from 'app/main/onboarding/employeeOnboardingConfig';
import LeaveTypeConfig from 'app/main/HR/leave_type/leaveTypeConfig';
import LeaveOptionsConfig from 'app/main/HR/leave_option/leaveOptionsConfig';
import SignatureConfig from 'app/main/employee/signature/signatureConfig';
import ProjectDashboardAppConfig from 'app/main/employee/dashboard/ProjectDashboardAppConfig';
import OnboardingConfig from 'app/main/HR/employee_onboarding/onboardingConfig';
import BusinessUnitsConfig from 'app/main/HR/business_unit/businessUnitsConfig';
import AllocateLeaveConfig from 'app/main/HR/employee_leave/allocateLeaveConfig';
import CalendarAppConfig from 'app/main/employee/calendar/CalendarAppConfig';
import ExternalRegConfig from 'app/main/external_user/registration/externalRegConfig';
import RolesConfig from 'app/main/HR/roles/rolesConfig';
import ResourcesConfig from 'app/main/HR/resources/resourceConfig';
import LeaveSumamaryConfig from 'app/main/HR/leave_summary/leaveSummaryConfig';
import EmployeeChecklistConfig from 'app/main/HR/employee_checklist/EmployeeChecklistConfig';
import AuthenticationConfig from 'app/main/authentication_pages/authenticationConfig';
import LeaveReviewConfig from 'app/main/line_manager/leave_review/leaveReviewConfig';
import HrLeaveReviewConfig from 'app/main/HR/leave_review/hrLeaveReviewConfig';
import LoanReqConfig from 'app/main/loanApp/loanReqConfig';
import fileManagerAppConfig from 'app/main/file-manager/FileManagerAppConfig';
import TrainingConfig from 'app/main/line_manager/training/trainingConfig';
import HrTrainingConfig from 'app/main/HR/training/hrTrainingConfig';
import PersonalTrainingConfig from 'app/main/personalTraining/personalTrainingConfig';
import CreatePersonalTrainingConfig from 'app/main/personalTraining/createPersonalTraining/CreatePersonalTrainingConfig';
import MainBlogConfig from 'app/main/blog/blogConfig';
import RecruitmentConfig from 'app/main/recruitment/recruitmentConfig';
import ContactsAppConfig from 'app/main/contact_list/ContactsAppConfig';
import DisciplinaryCaseConfig from 'app/main/disciplinary_case/DisciplinaryCaseConfig';
import CheckListConfig from 'app/main/check_list/CheckListConfig';
import SrepConfig from 'app/main/srep/srepConfig';
import DashboardConfig from 'app/main/personalTraining/personalTrainingDashboard/DashboardConfig';
import LineManagerDashboardConfig from 'app/main/line_manager/training/TrainingDashboard/lineManagerDashboardConfig';
import LeaveMgtConfig from 'app/main/leaveMgt/leaveMgtConfig';
import PerformanceAppraisalConfig from 'app/main/performanceAppraisal/PerformanceAppraisalConfig';
import FinanceManagerDashboardConfig from 'app/main/file-manager/TrainingDashboard/FinanceManagerDashboardConfig';
import HRRecruitmentDashboardConfig from 'app/main/recruitment/recruitmentDashboard/DashboardConfig';
import LoanDashboardConfig from 'app/main/loanApp/dashboard/loanDashboardConfig';
import JobTitleConfig from 'app/main/jobTitle/JobTitleConfig';
import EmployeeGradeConfig from 'app/main/employeeGrade/EmployeeGradeConfig';
import BehaviouralAttributeConfig from 'app/main/behaviouralAttribute/BehaviouralAttributeConfig';
import PermissionConfig from 'app/main/permission/PermissionConfig';
import EmployeeMgtConfig from 'app/main/employeeManagement/employeeMgtConfig';
import createEmployeeConfig from 'app/main/employeeManagement/createEmployeeConfig';
import EmployeeInformationConfig from 'app/main/employeeInformation/employeeInformationConfig';
import AttendanceConfig from 'app/main/attendance/attendanceConfig';
import ExitManagement from 'app/main/exitMgt/exitConfig';
import CompensationColumnsConfig from 'app/main/compensationColumns/CompensationColumnsConfig';
import SiteConfig from 'app/main/siteConfig/SiteConfig';

const routeConfigs = [
	// ExampleConfig,
	BlogConfig,
	HrLoginConfig,
	RegisterConfig,
	MailConfirmationPageConfig,
	EmployeeLoginConfig,
	HrConfirmConfig,
	EmployeeManagementConfig,
	ExitManagement,
	// EmployeeProfilePageConfig,
	EmployeeOnboardingConfig,
	LeaveTypeConfig,
	SignatureConfig,
	ProjectDashboardAppConfig,
	LeaveOptionsConfig,
	OnboardingConfig,
	BusinessUnitsConfig,
	AllocateLeaveConfig,
	CalendarAppConfig,
	ExternalRegConfig,
	RolesConfig,
	ResourcesConfig,
	LeaveSumamaryConfig,
	EmployeeChecklistConfig,
	AuthenticationConfig,
	LeaveReviewConfig,
	HrLeaveReviewConfig,
	LoanReqConfig,
	fileManagerAppConfig,
	TrainingConfig,
	HrTrainingConfig,
	CreatePersonalTrainingConfig,
	PersonalTrainingConfig,
	MainBlogConfig,
	RecruitmentConfig,
	AttendanceConfig,
	ContactsAppConfig,
	DisciplinaryCaseConfig,
	CheckListConfig,
	SrepConfig,
	LeaveMgtConfig,
	PerformanceAppraisalConfig,
	DashboardConfig,
	LeaveMgtConfig,
	LineManagerDashboardConfig,
	FinanceManagerDashboardConfig,
	HRRecruitmentDashboardConfig,
	LoanDashboardConfig,
	JobTitleConfig,
	EmployeeGradeConfig,
	BehaviouralAttributeConfig,
	PermissionConfig,
	EmployeeMgtConfig,
	// createEmployeeConfig,
	EmployeeInformationConfig,
	CompensationColumnsConfig,
	SiteConfig
];

const checkIfLoggedIn = () => {
	if (localStorage.getItem('jwt_access_token')) {
		return true;
	} else {
		return false;
	}
};

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		exact: true,
		component: checkIfLoggedIn()
			? React.lazy(() => import('app/main/employee/dashboard/ProjectDashboardApp'))
			: () => <Redirect to="/auth/login" />
	}
];

export default routes;
