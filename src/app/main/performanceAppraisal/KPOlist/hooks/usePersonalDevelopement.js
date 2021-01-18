import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import errorMsg from 'utils/errorMsg';
import React from 'react';
import { updatePersonalDevelopement, createPersonalDevelopement, deletePersonalDevelopement } from '../store/actions';

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

const usePersonalDevelopment = ({ dispatch, state, update, handleCancel, data }) => {
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

  const onSubmit = (value) => {
    const model = {
      ...value,
      employeeId: data.employeeId,
      kpoId: data.id
    }
    if(update) {
      dispatch(updatePersonalDevelopement({model, id: state.id}));
    } else {
      dispatch(createPersonalDevelopement(model));
      handleCancel && handleCancel();
    }
  };

  const handleDelete = (id) => () => {
    dispatch(deletePersonalDevelopement({id, kpoId: data.id}));
  }

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    toggleOpenState,
    open,
    handleDelete
  }
};

export default usePersonalDevelopment;