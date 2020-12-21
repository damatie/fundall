/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR', 'Hr Manager'],
	staff: ['employee', 'Employee', 'Line Manager', 'Hr Manager', 'Line managers', 'Finance Manager', 'Head of department', 'Director of support service'],
	manager: ['HR', 'Line managers', 'Director of support service'],
	managers: ['Hr Manager', 'Line Manager', 'Finance Manager', 'Head of department', 'Director of support service', "hr"],
	hod: ['Head of department'],
	user: ['admin', 'staff', 'user'],
	employee: ["employee", "Employee"],
	financeMnager: ["finance manager", "Finance Manager"],
	hrManager: ["Line Manager", "Hr Manager"],
	lineManager: ["line manager", "Line Manager"],
	onlyGuest: [],
	loan: ['Line managers', 'Finance Manager', 'Director of support service']
};

export default authRoles;
