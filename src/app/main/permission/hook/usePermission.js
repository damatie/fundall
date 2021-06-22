import React from 'react';
import * as Actions from '../store/actions';

const usePermission = ({dispatch}) => {
  const [payload, setPayload] = React.useState([]);
  const [role, setRole] = React.useState({});

  const handleSubmit = () => {
    // console.log(payload);
    dispatch(Actions.assignPermission(payload));
  };

  const handleClickTab = (rol) => () => {
    setRole(rol);
  };

  return {
    handleSubmit,
    handleClickTab,
    role,
    payload,
    setPayload
  };
};

export default usePermission;