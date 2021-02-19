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
  startDate: yup.string(
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
  endDate: yup.string(
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

const useTravelAndVacation = ({ dispatch }) => {
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
      dispatch(updateTravelAndVacation({ id, data:formData }));
      close();
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
    handleSubmit,
    control
  };
};

export default useTravelAndVacation;