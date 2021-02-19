import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from '../../../../utils/errorMsg';
import * as Actions from '../store/actions';

const schema = yup.object().shape({
  title: yup.string(
    errorMsg({
      name: 'Title',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Title',
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
  ),
});

const useBehaviouralAttribute = (params, dispatch) => {
  const {
    errors,
    handleSubmit,
    control,
    register
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleOpen = () => {
    dispatch({
      type: Actions.OPEN_BEHAVIOURAL_MODAL,
      payload: 'new'
    })
  };

  const handleClose = () => {
    dispatch({
      type: Actions.CLOSE_BEHAVIOURAL_MODAL,
      payload: 'new'
    })
  };

  const textFieldValue = (name) => {
    switch(params?.type) {
      case 'new':
        return '';
      case 'update':
        return params?.singleData[name];
    }

  };

  const modalTitle = () => {
    switch(params?.type) {
      case 'new':
        return 'New Behavioural Attribute';
      case 'update':
        return 'Update Behavioural Attribute';
    }
  };

  const buttonTitle = () => {
    switch(params?.type) {
      case 'new':
        return 'Create Behavioural Attribute';
      case 'update':
        return 'Update Behavioural Attribute';
    }
  }

  const onSubmit = (model) => {
    switch(params?.type) {
      case 'new':
        dispatch(Actions.createBehaviouralAttribute(model));
        break;
      case 'update':
        dispatch(Actions.updateBehaviouralAttribute({ id: params?.id, model }));
        break;
      default: 
        return model;
    }
  };

  const handleGetOne = (data) => {
    dispatch({
      type: Actions.GET_ONE_BEHAVIOURAL_ATTRIBUTE,
      payload: data
    })
    dispatch({
      type: Actions.OPEN_BEHAVIOURAL_MODAL,
      payload: 'update'
    })
  };

  const handleDelete = (id) => {
    dispatch(Actions.deleteBehaviouralAttribute(id));
  };

  return {
    handleOpen,
    handleClose,
    handleDelete,
    register,
    errors,
    control,
    handleGetOne,
    onSubmit,
    handleSubmit,
    textFieldValue,
    modalTitle,
    buttonTitle
  };
};

export default useBehaviouralAttribute;