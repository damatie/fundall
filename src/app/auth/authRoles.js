/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR'],
	staff: ['employee', 'Employee','HR', 'Line Manager', 'Finance Manager', 'Head of department', 'Director of support service'],
	manager: ['HR', 'Line manager', 'Director of support service'],
	managers: ['HR', 'Line manager', 'Finance manager', 'Head of department', 'Director of support service'],
	hod: ['Head of department'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: [],
	loan: ['Line manager', 'Finance manager', 'Director of support service']
};

export default authRoles;
