import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import {
  addTravelAndVacation,
  deleteTravelAndVacation,
  updateTravelAndVacation,
} from '../store/actions';

const schema = yup.object().shape({
  activity: yup.string(
    errorMsg({
      name: 'Activity',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Activity',
      type: 'required',
    })
  ),
  location: yup.string(
    errorMsg({
      name: 'Location',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Location',
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

const useTravelAndVacation = ({ dispatch }) => {
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
      dispatch(updateTravelAndVacation({ id, data:formData }));
      return;
    }
    dispatch(addTravelAndVacation(formData));
  };

  const handleDelete = (id) => {
    dispatch(deleteTravelAndVacation(id));
  };
  
  return {
    onSubmit,
    handleDelete,
    errors,
    register,
    handleSubmit
  };
};

export default useTravelAndVacation;