import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from '../../../../utils/errorMsg';

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

  const onSubmit = (value) => {
    console.log(value)
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
  };
};

export default useJobTitle;