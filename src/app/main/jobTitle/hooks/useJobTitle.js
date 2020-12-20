import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from '../../../../utils/errorMsg';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const schema = yup.object().shape({
  name: yup.string(
    errorMsg({
      name: 'Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Name',
      type: 'required',
    })
  ),
  description: yup.string(
    errorMsg({
      name: 'Description',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Description',
      type: 'required',
    })
  )
});


const useJobTitle = () => {
  const {
    register,
    errors,
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  const dispatch = useDispatch();
  const { data, open, singleData, type, loading } = {};

  React.useEffect(() => {
    dispatch(Actions.getAllJobTitle());
  }, []);

  const onSubmit = (model) => {
    switch(type) {
      case 'new':
        return dispatch(Actions.createJobTitle(model));
      case 'update':
        return dispatch(Actions.updateJobTitle({id: singleData?.id, model }));
      default:
        return;
    }
  };

  const openModal = () => {
    dispatch({
      type: Actions.OPEN_JOB_TITLE_MODAL,
      payload: 'new'
    });
  };

  const closeModal = () => {
    dispatch({
      type: Actions.CLOSE_JOB_TITLE_MODAL,
      payload: 'new'
    });
  };

  const handleGetOne = (data) => {
    dispatch({
      type: Actions.OPEN_JOB_TITLE_MODAL,
      payload: 'update'
    });
    dispatch({
      type: Actions.GET_ONE_JOB_TITLE,
      payload: data
    });
  };

  const handleDelete = (id) => {
    dispatch(Actions.deleteJobTitle(id));
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    data,
    singleData,
    openModal,
    closeModal,
    handleGetOne,
    handleDelete,
    open,
    type,
    loading,
    x: 'fucking test'
  };
};

export default useJobTitle;