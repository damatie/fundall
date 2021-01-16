import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKpoByDept, getAssignedKpo } from '../store/actions';
import { useHistory } from 'react-router-dom';

const useKpoReview = (user) => {
  const { deptKpo, loading, assignedKpo } = useSelector(state => state.kpo.kpoReview);
  const { departmentId, role, id } = useSelector(state => state.profile?.data);
  const dispatch = useDispatch();
  const { push } = useHistory();

  React.useEffect(() => {
    // if(role?.name.toUpperCase() === 'LINE MANAGER' && !user) {
      dispatch(getKpoByDept(departmentId));
    // }
    // dispatch(getAssignedKpo(id));
  }, []);

  const handleDelete = id => {
    console.log(id);
  }

  return {
    deptKpo,
    loading,
    push,
    handleDelete,
    assignedKpo,
    isAssigned: assignedKpo.length !== 0
  };
};

export default useKpoReview;