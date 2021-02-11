import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import {
  addTrainingAndExpertise,
  deleteTrainingAndExpertise,
  updateTrainingAndExpertise,
} from '../store/actions';

const schema = yup.object().shape({
  training: yup.string(
    errorMsg({
      name: 'Training',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Training',
      type: 'required',
    })
  ),
  dateAcquired: yup.string(
    errorMsg({
      name: 'Date Acquired',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Date Acquired',
      type: 'required',
    })
  ),
});

const useTrainingAndExpertise = ({ dispatch }) => {
  const {
    errors,
    control,
    register,
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (id, close) => (formData) => {
    if(id) {
      dispatch(updateTrainingAndExpertise({ id, data:formData }));
      close();
      return;
    }
    dispatch(addTrainingAndExpertise(formData));
  };

  const handleDelete = (id) => {
    dispatch(deleteTrainingAndExpertise(id));
  };
  
  return {
    onSubmit,
    handleDelete,
    errors,
    register,
    handleSubmit,
    control
  };
};

export default useTrainingAndExpertise;