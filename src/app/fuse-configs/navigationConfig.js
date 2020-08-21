import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from 'app/auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	// Dashboard navigations
	{
		id: 'applications',
		title: 'Applications',
		translate: 'Applications',
		type: 'group',
		icon: 'apps',
		
		children: [
			{
				id: 'dashboard',
				title: 'HR Dashboard',
				translate: 'Dashboard',
				type: 'item',
				icon: 'dashboard',
				type: 'collapse',
				children: [
					{
						id: 'hr_dashboard',
						title: 'Hr dashboard',
						type: 'item',
						url: '/hr/dashboard',
						icon: 'dashboard',
						auth: authRoles.admin,
					},
					{
						id: 'employee_dashboard',
						title: 'Dashboard',
						type: 'item',
						url: '/employee/dashboard',
						icon: 'dashboard',
						auth: authRoles.staff,
					},
				]
			},
			
			{
				id: 'employee_management',
				title: 'Employee management',
				translate: 'Employee management',
				type: 'collapse',
				icon: 'group_add',
				url: '/hr/employee_management',
				auth: authRoles.admin,
				children: [
					{
						id: 'employee_list',
						title: 'Employes management',
						type: 'item',
						url: '/hr/employee_management',
						exact: true
					},
					{
						id: 'new_employee',
						title: 'New employee',
						type: 'item',
						url: '/hr/employee_management/new',
						exact: true
					},
				]
			},
			{
				id: 'Telephone_directory',
				title: 'Telephone Directory',
				type: 'item',
				url: '/contacts/all',
				icon: 'account_box',
				auth: authRoles.admin,
			},
		]
	},
	// Blog navigations
	{
		id: 'blog',
		title: 'Blog',
		translate: 'Blog',
		type: 'group',
		children: [
			{
				id: 'blog_post',
				title: 'Blog post',
				type: 'item',
				url: '/main/blog/post',
				icon: 'add_comment',
				auth: authRoles.admin,
			},
			{
				id: 'blog_list',
				title: 'Blog list',
				type: 'item',
				url: '/main/blogs/',
				icon: 'chrome_reader_mode',
				auth: authRoles.staff,
			}
		]
	},
	// Onboarding navigations
	{
		id: 'employee_onboarding',
		title: 'Employee onboarding',
		translate: 'Employee onboarding',
		type: 'group',
		
		children: [
			{
				id: 'employee_onboarding_list',
				title: 'Employee onboarding list',
				type: 'item',
				url: '/hr/employee_onboarding_list',
				icon: 'card_membership',
				auth: authRoles.admin,
			},
			{
				id: 'create_onboarding_quiz',
				title: 'Create onboarding quiz',
				type: 'item',
				url: '/hr/create_onboarding_quiz',
				icon: 'playlist_add',
				auth: authRoles.admin,
			},
			{
				id: 'onboarding_quiz-results',
				title: 'Onboarding quiz result',
				type: 'item',
				url: '/hr/onboarding_quiz_result',
				icon: 'list_alt',
				auth: authRoles.admin,
			},
			{
				id: 'onboarding',
				title: 'Onboarding',
				type: 'item',
				url: '/employee/onboarding',
				icon: 'card_membership',
				auth: authRoles.staff,
			},
			{
				id: 'company_policy_test',
				title: 'Company policy test',
				type: 'item',
				url: '/employee/company_policy_test',
				icon: 'list_alt',
				auth: authRoles.staff,
			}
		]

	},
	// roles & resource navigations
	{
		id: 'roles&Resources',
		title: 'Roles and Resources',
		translate: 'Roles and Resources',
		type: 'group',
		icon: 'apps',
		auth: authRoles.admin,
		children: [
			{
				id: 'roles',
				title: 'Roles',
				translate: 'Roles',
				type: 'collapse',
				icon: 'assignment_turned_in',
				url: '/hr/roles',
				children: [
					{
						id: 'roles_list',
						title: 'Roles',
						type: 'item',
						url: '/hr/roles',
						exact: true
					},
					{
						id: 'new_role',
						title: 'New role',
						type: 'item',
						url: '/hr/roles/new',
						exact: true
					},
				]
			},
			{
				id: 'resources',
				title: 'Resources',
				translate: 'Resources',
				type: 'collapse',
				icon: 'layers',
				url: '/hr/resources',
				children: [
					{
						id: 'resources_list',
						title: 'Resources',
						type: 'item',
						url: '/hr/resources',
						exact: true
					},
					{
						id: 'new_resources',
						title: 'New resources',
						type: 'item',
						url: '/hr/rources/new',
						exact: true
					},
				]
			},
		
		]
	},
	// Entity & department navigations
	{
		id: 'business_unit_management',
		title: 'Entities',
		translate: 'Company management',
		type: 'group',
		icon: 'business',
		auth: authRoles.admin,
		children: [
			{
				id: 'business_unit',
				title: 'Entities',
				type: 'item',
				icon: 'business',
				url: '/hr/business_unit',
			},
			// {
			// 	id: 'department',
			// 	title: 'Department',
			// 	type: 'item',
			// 	url: '/hr/department',
			// 	icon: 'work_outline',
			// },
		]
	},
	// Loan navigations
	{
		id: 'loan_management',
		title: 'LOAN MANAGEMENT',
		translate: 'Loan management',
		type: 'group',
		children: [
			{
				id: 'loan_review',
				title: 'Loan review',
				type: 'item',
				url: '/loan/review/',
				icon: 'monetization_on',
				auth: authRoles.managers,
			},
			{
				id: 'loan_request',
				title: 'Loan request',
				type: 'item',
				url: '/loan/request',
				icon: 'monetization_on',
				auth: authRoles.staff,
			}
		]
	},
	// Leave navigations
	{
		id: 'leave_management',
		title: 'Leave management',
		translate: 'Leave management',
		type: 'group',
		children: [
			{
				id: 'leave_type',
				title: 'Leave type',
				type: 'collapse',
				url: '/hr/leave_type',
				icon: 'flight_takeoff',
				auth: authRoles.admin,
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
				type: 'collapse',
				url: '/hr/leave_options',
				icon: 'event',
				auth: authRoles.admin,
				children: [
					{
						id: 'new_leave_options',
						title: 'New leave options',
						type: 'item',
						url: '/hr/leave_options/new',
					}
				]
			},
			{
				id: 'allocate_leave',
				title: 'Allocate leave',
				type: 'item',
				url: '/hr/employee_leave',
				icon: 'calendar_today',
				auth: authRoles.admin,
			},
			// {
			// 	id: 'leave_review',
			// 	title: 'Leave review',
			// 	type: 'item',
			// 	url: '/hr/leave_review',
			// 	icon: 'calendar_today',
			// 	auth: authRoles.admin,
			// },
			{
				id: 'leave_summary',
				title: 'Leave summary',
				type: 'item',
				url: '/hr/leave_summary',
				icon: 'event_available',
				auth: authRoles.staff,
				
			},
			{
				id: 'request_leave',
				title: 'Request leave',
				type: 'item',
				url: '/employee/request_leave',
				icon: 'event',
				auth: authRoles.staff,
			},
			// {
			// 	id: 'leave_summary',
			// 	title: 'Leave summary',
			// 	type: 'item',
			// 	url: '/employee/leave_summary',
			// 	icon: 'calendar_today',
			// 	auth: authRoles.staff,
			// },
			{
				id: 'employee_leave',
				title: 'Employee leave',
				type: 'item',
				url: '/line_manager/leave_review',
				icon: 'calendar_today',
				auth: authRoles.manager,
			}
		]
	},
	// Document Library
	{
		id: 'library',
		title: 'Library',
		translate: 'Library',
		type: 'group',
		children: [
			{
				id: 'documents',
				title: 'Documents library',
				type: 'item',
				url: '/library/documents',
				icon: 'folder',
				auth: authRoles.staff,
			},
			{
				id: 'documentCategory',
				title: 'Document Category',
				type: 'item',
				url: '/library/categories',
				icon: 'category',
				auth: authRoles.admin,
			}
		]
	},
	
	// Training navigations
	{
		id: 'training',
		title: 'Training',
		translate: 'training',
		type: 'group',
		children: [
			{
				id: 'trainingManagement',
				title: 'Training Management',
				type: 'item',
				url: '/hr/training/management',
				icon: 'school',
				auth: authRoles.admin,
			},
			{
				id: 'deptTraining',
				title: 'Department Training',
				type: 'item',
				url: '/training/dept',
				icon: 'group',
				auth: authRoles.managers,
			},
			{
				id: 'personalTraining',
				title: 'Personal Training',
				type: 'item',
				url: '/training/personal',
				icon: 'book',
				auth: authRoles.staff,
			},
			{
				id: 'courseCategory',
				title: 'Course Category',
				type: 'item',
				url: '/hr/training/category',
				icon: 'category',
				auth: authRoles.admin,
			}
		]
	},
	// Settings navigations
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
			}
		]
	},
];

export default navigationConfig;
