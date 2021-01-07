/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR', 'Hr Manager'],
	staff: ['employee', 'Employee', 'Line Manager','HR', 'Line managers', 'Finance Manager', 'Head of department', 'Director of support service', 'HR Manager', 'Hr Manager'],
	manager: ['HR', 'Line managers', 'Director of support service', 'HR Manager'],
	managers: ['HR', 'Line Manager', 'Finance Manager', 'Head of department', 'Director of support service', "hr", 'HR Manager'],
	hod: ['Head of department'],
	user: ['admin', 'staff', 'user'],
	employee: ["employee", "Employee"],
	financeMnager: ["finance manager", "Finance Manager"],
	hrManager: ["Line Manager", "Hr Manager"],
	lineManager: ["line manager", "Line Manager"],
	onlyGuest: [],
	loan: ['Hr Manager', 'Finance Manager', 'Director of support service']
};

export default authRoles;
