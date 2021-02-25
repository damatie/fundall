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
				id: 'employee_dashboard',
				title: 'Dashboard',
				type: 'item',
				url: '/employee/dashboard',
				icon: 'dashboard',
				auth: authRoles?.staff,
			},
			{
				id: 'employee_management',
				title: 'Employee management',
				translate: 'Employee management',
				type: 'item',
				icon: 'group_add',
				url: '/employee_management',
				auth: authRoles?.admin,
			},
			{
				id: 'Telephone_directory',
				title: 'Telephone Directory',
				type: 'item',
				url: '/contacts/all',
				icon: 'account_box',
				auth: authRoles?.admin,
			},
			{
				id: 'job_title',
				title: 'Job Title',
				type: 'item',
				url: '/jobTitle/all',
				icon: 'account_box',
				auth: authRoles?.admin,
			},
			{
				id: 'employee_grade',
				title: 'Employee Grade',
				type: 'item',
				url: '/employeeGrade/all',
				icon: 'account_box',
				auth: authRoles?.admin,
			},
			{
				id: 'library',
				title: 'Document Library',
				translate: 'Document Library',
				type: 'item',
				url: '/library/folders',
				icon: 'folder',
				auth: authRoles?.staff
			},
			// roles & resource navigations
			{
				id: 'roles&Permission',
				title: 'Roles and Permission',
				translate: 'Roles and Resources',
				icon: 'apps',
				auth: authRoles?.admin,
				type: 'item',
				url: '/roles/permissions',
			},
			{
				id: 'compensationColumns',
				title: 'Compensation Columns',
				translate: 'Compensation Columns',
				icon: 'view_week',
				auth: authRoles?.admin,
				type: 'item',
				url: '/compensation/columns',
			},
		]
	},
	{
		id: 'exitMgt',
		title: 'Exit Management',
		translate: 'Exit Management',
		type: 'group',
		children: [
			{
				id: 'employee_exit_dashboard',
				title: 'Dashboard',
				type: 'item',
				url: '/exit/home',
				icon: 'add_comment',
				auth: authRoles.staff,
			},
			{
				id: 'line_manager_exit_dashboard',
				title: 'Department Dashboard',
				type: 'item',
				url: '/exit/list/department',
				icon: 'add_comment',
				auth: authRoles.lineManager,
			},
			{
				id: 'admin_exit_dashboard',
				title: 'Admin Dashboard',
				type: 'item',
				url: '/exit/list/company',
				icon: 'add_comment',
				auth: authRoles.admin
			}
		]
	},
	{
		id: 'attendance',
		title: 'Attandance Management',
		translate: 'Attandance Management',
		type: 'group',
		children: [
			{
				id: 'attendance_dashboard',
				title: 'Personal Dashboard',
				type: 'item',
				url: '/attendance/dashboard',
				icon: 'add_comment',
				auth: authRoles.staff,
			},
			{
				id: 'attendance_list',
				title: 'Attendance Dashboard',
				type: 'item',
				url: '/activity/list',
				icon: 'add_comment',
				auth: authRoles.admin,
			}
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
				auth: authRoles?.manager,
			},
			{
				id: 'blog_list',
				title: 'Blog list',
				type: 'item',
				url: '/main/blogs/',
				icon: 'chrome_reader_mode',
				auth: authRoles?.staff,
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
				auth: authRoles?.admin,
			},
			{
				id: 'create_onboarding_quiz',
				title: 'Create onboarding quiz',
				type: 'item',
				url: '/hr/create_onboarding_quiz',
				icon: 'playlist_add',
				auth: authRoles?.admin,
			},
			{
				id: 'onboarding_quiz-results',
				title: 'Onboarding quiz result',
				type: 'item',
				url: '/hr/onboarding_quiz_result',
				icon: 'list_alt',
				auth: authRoles?.admin,
			},
			{
				id: 'onboarding',
				title: 'Onboarding',
				type: 'item',
				url: '/employee/onboarding',
				icon: 'card_membership',
				auth: authRoles?.staff,
			},
			{
				id: 'company_policy_test',
				title: 'Company policy test',
				type: 'item',
				url: '/employee/company_policy_test',
				icon: 'list_alt',
				auth: authRoles?.staff,
			}
		]

	},
	// Entity & department navigations
	{
		id: 'business_unit_management',
		title: 'Entities',
		translate: 'Company management',
		type: 'group',
		icon: 'business',
		auth: authRoles?.admin,
		children: [
			{
				id: 'business_unit',
				title: 'Entities',
				type: 'item',
				icon: 'business',
				url: '/hr/business_unit',
			},
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
				auth: authRoles?.manager,
			},
			{
				id: 'loan_request',
				title: 'Loan request',
				type: 'item',
				url: '/loan/request',
				icon: 'monetization_on',
				auth: authRoles?.staff,
			},
			// {
			// 	id: 'loan_salary_advance_list',
			// 	title: 'Salary Advance Loans',
			// 	type: 'item',
			// 	url: '/loan/salary_advance/list',
			// 	icon: 'monetization_on',
			// 	auth: authRoles.managers,
			// }
		]
	},
	// Leave mgt navigations
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
				auth: authRoles?.admin,
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
				auth: authRoles?.admin,

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
				auth: authRoles?.admin,
			},
			// {
			// 	id: 'leave_review',
			// 	title: 'Leave review',
			// 	type: 'item',
			// 	url: '/hr/leave_review',
			// 	icon: 'calendar_today',
			// 	auth: authRoles?.admin,
			// },
			{
				id: 'leave_summary',
				title: 'Leave summary',
				type: 'item',
				url: '/hr/leave_summary',
				icon: 'event_available',
				auth: authRoles?.staff,

			},
			{
				id: 'request_leave',
				title: 'Request leave',
				type: 'item',
				url: '/employee/request_leave',
				icon: 'event',
				auth: authRoles?.staff,
			},
			// {
			// 	id: 'leave_summary',
			// 	title: 'Leave summary',
			// 	type: 'item',
			// 	url: '/employee/leave_summary',
			// 	icon: 'calendar_today',
			// 	auth: authRoles?.staff,
			// },
			{
				id: 'employee_leave',
				title: 'Employee leave',
				type: 'item',
				url: '/line_manager/leave_review',
				icon: 'calendar_today',
				auth: authRoles?.manager,
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
				id: 'training_Dashboard',
				title: 'Training Dashboard',
				type: 'collapse',
				// url: '/hr/training/management',
				icon: 'dashboard',
				children: [
					{
						id: 'staff_dashboard',
						title: 'Employee Dashboard',
						type: 'item',
						icon: 'layers',
						url: '/employee/training/dashboard',
						auth: authRoles.staff,
					},
					{
						id: 'line_manager_dashboard',
						title: 'Line Manager Dashboard',
						type: 'item',
						icon: 'layers',
						url: '/line_manager/training/dashboard',
						auth: authRoles.staff,
					},
					{
						id: 'finance_manager_dashboard',
						title: 'Finance Manager Dashboard',
						type: 'item',
						icon: 'layers',
						url: '/finance_manager/training/dashboard',
						auth: authRoles.staff,
					},
				]
			},

			{
				id: 'trainingManagement',
				title: 'Training Management',
				type: 'item',
				url: '/hr/training/management',
				icon: 'school',
				auth: authRoles?.admin,
			},
			{
				id: 'personalTraining',
				title: 'Personal Training',
				type: 'item',
				url: '/training/personal',
				icon: 'book',
				auth: authRoles?.staff,
			},
			{
				id: 'trainingList',
				title: 'Departmental Training List',
				type: 'item',
				url: '/training/list',
				icon: 'book',
				auth: authRoles?.lineManager,
			},
			{
				id: 'courseCategory',
				title: 'Course Category',
				type: 'item',
				url: '/hr/training/category',
				icon: 'category',
				auth: authRoles?.admin,
			},
			{
				id: 'checkList',
				title: 'Check List',
				type: 'item',
				url: '/training/checklist',
				icon: 'category',
				auth: authRoles?.staff,
			}
		]
	},

	// Recruitment navigations
	{
		id: 'recruitment',
		title: 'Recruitment',
		translate: 'recruitment',
		type: 'group',
		auth: authRoles?.manager,
		children: [
			{
				id: 'recruitmentDashboard',
				title: 'Dashboard',
				type: 'item',
				url: '/recruitment/dashboard',
				icon: 'school',
				auth: authRoles.manager,
			},
			{
				id: 'listOfOpenings',
				title: 'List of openings',
				type: 'item',
				url: '/recruitment/all',
				icon: 'school',
				auth: authRoles?.manager,
			},
			{
				id: 'createOpening',
				title: 'Create new Opening',
				type: 'item',
				url: '/recruitment/create_opening',
				icon: 'group',
				auth: authRoles?.manager,
			},
		]
	},

	// Disciplinary Case navigations
	{
		id: 'disciplinaryCase',
		title: 'Disciplinary Case',
		translate: 'disciplinary case',
		type: 'group',
		auth: authRoles?.admin,
		children: [
			{
				id: 'disciplinaryCaseManagement',
				title: 'Disciplinary Case Management',
				type: 'item',
				url: '/hr/disciplinary/case',
				icon: 'announcement',
				auth: authRoles?.admin,
			},
		]
	},

	// PERFORMANCE APPRAISAL NAVIGATION
	{
		id: 'performanceAppraisal',
		title: 'Performance appraisal',
		translate: 'performance appraisal',
		type: 'group',
		// auth: authRoles?.admin,
		children: [
			{
				id: 'kpoCategory',
				title: 'KPO Category',
				type: 'item',
				url: '/hr/performance_appraisal/kpoCategory',
				icon: 'assignment',
				auth: authRoles?.admin,
			},
			{
				id: 'kpoReview',
				title: 'KPO Review',
				type: 'item',
				url: '/performance_appraisal/kpo/review',
				icon: 'assignment',
				auth: authRoles?.manager,
			},
			{
				id: 'kpoList',
				title: 'KPO',
				type: 'item',
				url: '/performance_appraisal/kpoList',
				icon: 'assignment',
				auth: authRoles?.staff,
			},
			{
				id: 'behaviouralAttribute',
				title: 'Behavioural Attribute',
				type: 'item',
				url: '/behaviouralAttribute/all',
				icon: 'assignment',
				auth: authRoles?.admin,
			},
		]
	},

	// SREP navigations
	{
		id: 'srep',
		title: 'SpringRock Education Program',
		translate: 'SpringRock Education Program',
		type: 'group',
		children: [
			{
				id: 'applySREP',
				title: 'Apply for Education Program',
				type: 'item',
				url: '/srep/apply',
				icon: 'note_add',
				auth: authRoles?.staff
			},
			{
				id: 'listSREP',
				title: 'My Application',
				type: 'item',
				url: '/srep/myapplications',
				icon: 'list_alt',
				auth: authRoles?.staff
			},
			{
				id: 'listSREPs',
				title: 'All Application',
				type: 'item',
				url: '/srep/all',
				icon: 'list_alt',
				auth: authRoles?.admin
			},
		]
	},
	// Settings navigations
	{
		id: 'settings',
		title: 'Settings',
		translate: 'Settings',
		type: 'group',
		auth: authRoles?.staff,
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
