/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR'],
	staff: ['employee', 'Line managers'],
	manager: ['Line managers'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: []
};

export default authRoles;
