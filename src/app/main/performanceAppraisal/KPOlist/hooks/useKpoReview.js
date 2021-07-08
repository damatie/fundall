import React from 'react';
import userRole from 'utils/userRole';
import { getKpoByEntity, OPEN_REQUEST_KPO_MODAL, CLOSE_REQUEST_KPO_MODAL, kpoReq } from '../store/actions';

const useKpoReview = ({dispatch, push, userInfo, kpoList}) => {
  const { deptKpo, loading, assignedKpo, entities, kpoRequest, details, open } = kpoList;
  const { departmentId, role, id } = userInfo;

  const handleDelete = id => {
    console.log(id);
  }

  const handleFilter = ({ target: { value }}) => {
    dispatch(getKpoByEntity(value));
  }

  const handleOpen = (data) => {
    dispatch({
      type: OPEN_REQUEST_KPO_MODAL,
      payload: data
    });
  };

  const handleClose = () => {
    dispatch({
      type: CLOSE_REQUEST_KPO_MODAL
    });
  };

  const handleReq = (type) => () => {
    dispatch(kpoReq({
      id: details.id,
      type
    }))
  };

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
    kpoRequest,
    handleOpen,
    handleClose,
    handleReq,
    open
  };
};

export default useKpoReview;