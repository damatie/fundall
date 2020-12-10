import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKpoByDept } from '../store/actions';
import { useHistory } from 'react-router-dom';

const useKpoReview = () => {
  const { deptKpo, loading } = useSelector(state => state.kpo.kpoReview);
  const { departmentId, role } = useSelector(state => state.profile?.data);
  const dispatch = useDispatch();
  const { push } = useHistory();

  React.useEffect(() => {
    if(role?.name.toUpperCase() === 'LINE MANAGER') {
      dispatch(getKpoByDept(departmentId));
    }
  }, [role]);

  const handleDelete = id => {
    console.log(id);
  }

  return {
    deptKpo,
    loading,
    push,
    handleDelete
  };
};

export default useKpoReview;