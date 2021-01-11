import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from '../../../../utils/errorMsg';
import { useDispatch } from 'react-redux';
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
  ),
  pip: yup.mixed().required(
    errorMsg({
      name: 'PIP Eligible',
      type: 'required',
    })
  )
});

const useEmployeeGrade = (params, dispatch) => {
  const {
    errors,
    handleSubmit,
    control,
    register,
    getValues,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  // const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch({
      type: Actions.OPEN_EMPLPYEE_GRADE_MODAL,
      payload: 'new'
    })
  };

  const handleClose = () => {
    dispatch({
      type: Actions.CLOSE_EMPLOYEE_GRADE_MODAL,
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
        return 'New Employee Grade';
      case 'update':
        return 'Update Employee Grade';
    }
  };

  const buttonTitle = () => {
    switch(params?.type) {
      case 'new':
        return 'Create Employee Grade';
      case 'update':
        return 'Update Employee Grade';
    }
  }

  const onSubmit = (model) => {
    switch(params?.type) {
      case 'new':
        dispatch(Actions.createEmployeeGrade(model));
      case 'update':
        dispatch(Actions.updateEmployeeGrade({ id: params?.id, model }));
      default: 
        return model;
    }
  };

  const handleGetOne = (data) => {
    dispatch({
      type: Actions.GET_ONE_EMPLOYEE_GRADE,
      payload: data
    })
    dispatch({
      type: Actions.OPEN_EMPLPYEE_GRADE_MODAL,
      payload: 'update'
    })
  };

  const handleDelete = (id) => {
    dispatch(Actions.deleteEmployeeGrade(id));
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
    buttonTitle,
    x: 'fucking test',
    state: params,
    getValues: getValues(),
  };
};

export default useEmployeeGrade;