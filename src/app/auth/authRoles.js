/**
 * Authorization Roles
 */

const roles = () => {
	return {
		admin: ['Hr Manager', 'Hr Admin'],
		staff: ['Employee', 'Line Manager', 'Finance Manager', 'Hr Manager', 'Hr Admin'],
		manager: ['Line Manager', 'Finance Manager', 'Hr Manager', 'Hr Admin'],
	};
}
const authRoles = roles();

export default authRoles;
