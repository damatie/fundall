/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR', 'hr', "Hr Manager"],
	staff: ['employee', 'Employee', 'Line Manager', 'HR', 'Hr Manager', 'Line managers', 'Finance Manager', 'Head of department', 'Director of support service'],
	manager: ['HR', 'Hr Manager', 'Line managers', 'Director of support service'],
	managers: ['HR', 'Hr Manager', 'Line Manager', 'Finance Manager', 'Head of department', 'Director of support service', "hr"],
	hod: ['Head of department'],
	user: ['admin', 'staff', 'user'],
	employee: ["employee", "Employee"],
	financeMnager: ["finance manager", "Finance Manager"],
	hrManager: ["line manager", "Line Manager", "hr", "HR", "Hr Manager"],
	lineManager: ["line manager", "Line Manager"],
	onlyGuest: [],
	loan: ['Line managers', 'Finance Manager', 'Director of support service']
};

export default authRoles;
