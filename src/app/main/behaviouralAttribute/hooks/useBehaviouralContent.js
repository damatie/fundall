import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from '../../../../utils/errorMsg';
import * as Actions from '../store/actions';

const schema = yup.object().shape({
  subject: yup.string(
    errorMsg({
      name: 'Subject',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Subject',
      type: 'required',
    })
  ),
  subtext: yup.string(
    errorMsg({
      name: 'Subtext',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Subtext',
      type: 'required',
    })
  ),
});

const useBehaviouralContent = (params, dispatch) => {
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
      type: Actions.OPEN_BEHAVIOURAL_CONTENT_MODAL,
    })
  };

  const handleClose = () => {
    dispatch({
      type: Actions.CLOSE_BEHAVIOURAL_CONTENT_MODAL,
    })
  };

  const textFieldValue = (name) => {
    switch(params?.isUpdate) {
      case false:
        return '';
      case true:
        return params?.details[name];
    }
  };

  const modalTitle = () => {
    switch(params?.isUpdate) {
      case false:
        return 'New Behavioural Attribute Content';
      case true:
        return 'Update Behavioural Attribute Content';
    }
  };

  const buttonTitle = () => {
    switch(params?.isUpdate) {
      case false:
        return 'Create';
      case true:
        return 'Update';
    }
  }

  const onSubmit = (value) => {
    const model = {
      ...value,
      headerId: params.id
    }
    switch(params?.isUpdate) {
      case false:
        dispatch(Actions.createBehaviouralContent(model));
        break;
      case true:
        dispatch(Actions.updateBehaviouralContent({ id: params?.details.id, model, headerId: params.id }));
        break;
      default: 
        return model;
    }
  };

  const handleGetOne = (data) => {
    dispatch({
      type: Actions.GET_ONE_BEHAVIOURAL_CONTENT,
      payload: data
    })
    dispatch({
      type: Actions.OPEN_BEHAVIOURAL_CONTENT_MODAL,
    })
  };

  const handleDelete = (id) => {
    dispatch(Actions.deleteBehaviouralContent({
      id,
      headerId: params.id
    }));
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

export default useBehaviouralContent;