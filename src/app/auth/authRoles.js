/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR'],
	staff: ['employee', 'Line managers','HR', 'Line managers', 'Finance manager', 'Head of department'],
	manager: ['HR', 'Line managers'],
	managers: ['HR', 'Line managers', 'Finance manager', 'Head of department'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: []
};

export default authRoles;
