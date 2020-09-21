/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR'],
	staff: ['employee', 'Employee', 'Line managers','HR', 'Line managers', 'Finance manager', 'Head of department', 'Director of support service'],
	manager: ['HR', 'Line managers', 'Director of support service'],
	managers: ['HR', 'Line managers', 'Finance manager', 'Head of department', 'Director of support service'],
	hod: ['Head of department'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: [],
	loan: ['Line managers', 'Finance manager', 'Director of support service']
};

export default authRoles;
