/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['HR'],
	staff: ['staff'],
	user: ['admin', 'staff', 'user'],
	onlyGuest: []
};

export default authRoles;
