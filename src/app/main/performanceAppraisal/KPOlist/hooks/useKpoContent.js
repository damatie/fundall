import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const useKpoContentList = () => {
  const { open } = useSelector(state => state.kpo.kpoContentList);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch({type: Actions.OPEN_ADD_KPO_CONTENT_MODAL})
  }
  const handleCloseModal = () => {
    dispatch({type: Actions.CLOSE_ADD_KPO_CONTENT_MODAL})
  }
  return {
    open,
    handleOpenModal,
    handleCloseModal
  };
};

export default useKpoContentList;