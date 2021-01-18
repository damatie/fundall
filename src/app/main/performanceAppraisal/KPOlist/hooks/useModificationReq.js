import React from 'react';

const useModificationReq = ({state, dispatch, role}) => {

  const userRole = (role) => {
    const newRole = role.split(' ').join('').toLowerCase();
    console.log(newRole)
    return newRole;
    
  }
  const handleClick = (action) => () => {
    switch(action) {
      case 'request':
        return;
      case 'approve':
        return;
      case 'reject':
        return;
      default:
        return null;
    }
  };

  return {
    handleClick,
    role: userRole(role),
  };
};

export default useModificationReq;