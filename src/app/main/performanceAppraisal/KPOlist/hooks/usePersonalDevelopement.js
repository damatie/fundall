import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';

const schema = yup.object().shape({
  name: yup.string(errorMsg({
    name: '',
    type: 'string'
  })).required(errorMsg({
    name: '',
    type: 'required'
  })),
  actionRequired: yup.string(errorMsg({
    name: '',
    type: 'string'
  })).required(errorMsg({
    name: '',
    type: 'required'
  }))
});

const usePersonalDevelopment = ({ dispatch, state }) => {
  const  {
    errors,
    register,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = React.useState(false);

  const toggleOpenState = () => {
    setOpen(!open);
  }

  const onSubmit = (model) => {
    console.log(model)
  };

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    toggleOpenState,
    open
  }
};

export default usePersonalDevelopment;