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
      name: 'Start Year',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Start Year',
      type: 'required',
    })
  ),
  endYear: yup.string(
    errorMsg({
      name: 'End Year',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'End Year',
      type: 'required',
    })
  ),
});

const useEducation = ({ dispatch }) => {
  const {
    errors,
    register,
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (id) => (formData) => {
    if(id) {
      dispatch(updateEducation({ id, data:formData }));
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
    handleSubmit
  };
};

export default useEducation;