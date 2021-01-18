import React from 'react';
import { modifications } from '../store/actions';

const useModificationReq = ({state, dispatch, role}) => {

  const userRole = (role) => {
    const newRole = role.split(' ').join('').toLowerCase();
    console.log(newRole)
    return newRole;
    
  }
  const handleClick = (action) => () => {
    dispatch(modifications(action));
  };

  return {
    handleClick,
    role: userRole(role),
  };
};

export default useModificationReq;