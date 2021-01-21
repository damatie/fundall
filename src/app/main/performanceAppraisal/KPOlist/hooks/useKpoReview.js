import React from 'react';
import userRole from 'utils/userRole';
import { getKpoByEntity } from '../store/actions';

const useKpoReview = ({dispatch, push, userInfo, kpoList}) => {
  const { deptKpo, loading, assignedKpo, entities } = kpoList;
  const { departmentId, role, id } = userInfo;

  const handleDelete = id => {
    console.log(id);
  }

  const handleFilter = ({ target: { value }}) => {
    dispatch(getKpoByEntity(value));
  }

  return {
    deptKpo,
    loading,
    push,
    handleDelete,
    assignedKpo,
    isAssigned: assignedKpo.length !== 0,
    entities,
    handleFilter,
    role: userRole(role?.name),
  };
};

export default useKpoReview;