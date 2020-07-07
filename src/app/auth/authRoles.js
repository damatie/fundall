/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR'],
	staff: ['employee'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: []
};

export default authRoles;
