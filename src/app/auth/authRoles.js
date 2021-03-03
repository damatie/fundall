/**
 * Authorization Roles
 */

const roles = () => {
	return {
		admin: ['HR MANAGER', 'HR ADMIN', "hr manager", "hr admin"],
		staff: ['EMPLOYEE', 'LINE MANAGER', 'FINANCE MANAGER', 'HR MANAGER', 'HR ADMIN', 'REVIEWING MANAGER',
			"employee", "line manager", "finance manager", "hr manager", 'hr admin, "reviewing manager'
		],
		manager: ['LINE MANAGER', 'FINANCE MANAGER', 'HR MANAGER', 'HR ADMIN', 'REVIEWING MANAGER', "line manager",
			"finance manager", "hr manager", "hr admin", "reviewing manager"
		],
		lineManager: ["LINE MANAGER", "line manager"],
		financeManager: ['FINANCE MANAGER', 'finance manager'],
	};
}
const authRoles = roles();

export default authRoles;
