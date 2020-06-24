import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	// hr nav
	{
		id: 'applications',
		title: 'Applications',
		translate: 'Applications',
		type: 'group',
		icon: 'apps',
		auth: authRoles.admin,
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				translate: 'Dashboard',
				type: 'item',
				icon: 'dashboard',
				url: '/hr/dashboard'
			},
			{
				id: 'employee_management',
				title: 'Employee management',
				translate: 'Employee management',
				type: 'collapse',
				icon: 'group_add',
				url: '/hr/employee_management',
				children: [
					{
						id: 'new_employee',
						title: 'New employee',
						type: 'item',
						url: '/hr/employee_management/new',
						exact: true
					},
				]
			},
		
		]
	},
	{
		id: 'business_unit_management',
		title: 'Business unit management',
		translate: 'Business unit management',
		type: 'group',
		icon: 'business',
		auth: authRoles.admin,
		children: [
			{
				id: 'business_unit',
				title: 'Business unit',
				type: 'item',
				icon: 'business',
				url: '/hr/business_unit',
			},
			{
				id: 'department',
				title: 'Department',
				type: 'item',
				url: '/hr/department',
				icon: 'work_outline',
			},
		]
	},
	{
		id: 'leave_management',
		title: 'Leave management',
		translate: 'Leave management',
		type: 'group',
		auth: authRoles.admin,
		children: [
			{
				id: 'leave_type',
				title: 'Leave type',
				type: 'collapse',
				url: '/hr/leave_type',
				icon: 'flight_takeoff',
				children: [
					{
						id: 'new_leave_type',
						title: 'New leave type',
						type: 'item',
						url: '/hr/leave_type/new',
					}

				]
			},
			{
				id: 'leave_options',
				title: 'Leave options',
				type: 'item',
				url: '/hr/leave_options',
				icon: 'event',
			},
			{
				id: 'employee_leave',
				title: 'Employee leave',
				type: 'item',
				url: '/hr/employee_leave',
				icon: 'calendar_today',
			},
			{
				id: 'leave_summary',
				title: 'Leave summary',
				type: 'item',
				url: '/hr/leave_summary',
				icon: 'event_available',
				
			},
		]
	},
	{
		id: 'employee_onboarding',
		title: 'Employee onboarding',
		translate: 'Employee onboarding',
		type: 'group',
		auth: authRoles.admin,
		children: [
			{
				id: 'employee_onboarding_list',
				title: 'Employee onboarding list',
				type: 'item',
				url: '/hr/employee_onboarding_list',
				icon: 'card_membership',
			},
			{
				id: 'create_onboarding_quiz',
				title: 'Create onboarding quiz',
				type: 'item',
				url: '/hr/create_onboarding_quiz',
				icon: 'playlist_add',
			},
			{
				id: 'onboarding_quiz-results',
				title: 'Onboarding quiz result',
				type: 'item',
				url: '/hr/onboarding_quiz_result',
				icon: 'list_alt',
			},
		]

	},
	{
		id: 'hr_settings',
		title: 'Settings',
		translate: 'Settings',
		type: 'group',
		auth: authRoles.admin,
		children: [
			{
				id: 'hr_profile_settings',
				title: 'Profile settings',
				type: 'item',
				url: '/hr/profile_settings',
				icon: 'settings_applications',
			}
		]
	},

	//Employee nav
	{
		id: 'application',
		title: 'Application',
		translate: 'Application',
		type: 'group',
		auth: authRoles.staff,
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				type: 'item',
				url: '/employee/dashboard',
				icon: 'dashboard',
			},
			{
				id: 'onboarding',
				title: 'Onboarding',
				type: 'item',
				url: '/employee/onboarding',
				icon: 'card_membership',
			},
			{
				id: 'company_policy_test',
				title: 'Company policy test',
				type: 'item',
				url: '/employee/company_policy_test',
				icon: 'list_alt',
			}
		]
	},
	{
		id: 'Leave management',
		title: 'Leave management',
		translate: 'Leave management',
		type: 'group',
		auth: authRoles.staff,
		children: [
			{
				id: 'request_leave',
				title: 'Request leave',
				type: 'item',
				url: '/employee/request_leave',
				icon: 'event',
			},
			{
				id: 'leave_summary',
				title: 'Leave summary',
				type: 'item',
				url: '/employee/leave_summary',
				icon: 'calendar_today',
			}
		]
	},
	{
		id: 'settings',
		title: 'Settings',
		translate: 'Settings',
		type: 'group',
		auth: authRoles.staff,
		children: [
			{
				id: 'profile',
				title: 'Profile',
				type: 'item',
				url: '/employee/profile',
				icon: 'settings_applications',
			},
			{
				id: 'signature',
				title: 'Signature',
				type: 'item',
				url: '/employee/signature',
				icon: 'edit',
			}
		]
	},
];

export default navigationConfig;
