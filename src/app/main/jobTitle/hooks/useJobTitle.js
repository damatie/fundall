import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from '../../../../utils/errorMsg';
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


const useJobTitle = ({dispatch, state}) => {
  const {
    register,
    errors,
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {}
  });
  const { data, open, singleData, type, loading } = state;

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