/**
 * Authorization Roles
 */

const roles = () => {
	return {
		admin: ['HR MANAGER', 'HR ADMIN'],
		staff: ['EMPLOYEE', 'LINE MANAGER', 'FINANCE MANAGER', 'HR MANAGER', 'HR ADMIN', 'REVIEWING MANAGER'],
		manager: ['LINE MANAGER', 'FINANCE MANAGER', 'HR MANAGER', 'HR ADMIN', 'REVIEWING MANAGER'],
		lineManager: ["LINE MANAGER"],
		financeManager: ['FINANCE MANAGER'],
	};
}
const authRoles = roles();

export default authRoles;
