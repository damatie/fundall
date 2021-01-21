const userRole = (role) => {
  const newRole = role && role.split(' ').join('').toLowerCase();
  return newRole;
};

export default userRole;