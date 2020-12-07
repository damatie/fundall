/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR'],
	staff: ['employee', 'Employee', 'Line Manager','HR', 'Line managers', 'Finance Manager', 'Head of department', 'Director of support service'],
	manager: ['HR', 'Line managers', 'Director of support service'],
	managers: ['HR', 'Line Manager', 'Finance Manager', 'Head of department', 'Director of support service', "hr"],
	hod: ['Head of department'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: [],
	loan: ['Line managers', 'Finance Manager', 'Director of support service']
};

export default authRoles;
