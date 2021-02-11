import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import {
  addEducation,
  deleteEducation,
  updateEducation,
} from '../store/actions';

const schema = yup.object().shape({
  school: yup.string(
    errorMsg({
      name: 'School',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'School',
      type: 'required',
    })
  ),
  department: yup.string(
    errorMsg({
      name: 'Department',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Department',
      type: 'required',
    })
  ),
  qualification: yup.string(
    errorMsg({
      name: 'Qualification',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Qualification',
      type: 'required',
    })
  ),
  grade: yup.string(
    errorMsg({
      name: 'Grade',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Grade',
      type: 'required',
    })
  ),
  startYear: yup.string(
    errorMsg({
      name: 'Start Date',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Start Date',
      type: 'required',
    })
  ),
  endYear: yup.string(
    errorMsg({
      name: 'End Date',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'End Date',
      type: 'required',
    })
  ),
});

const useEducation = ({ dispatch }) => {
  const {
    errors,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (id, close) => (formData) => {
    if(id) {
      dispatch(updateEducation({ id, data:formData }));
      close();
      return;
    }
    dispatch(addEducation(formData));
  };

  const handleDelete = (id) => {
    dispatch(deleteEducation(id));
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

export default useEducation;