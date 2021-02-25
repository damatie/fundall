import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import {
  addNextOfKin,
  deleteNextOfKin,
  updateNextOfKin,
} from '../store/actions';

const schema = yup.object().shape({
  firstName: yup.string(
    errorMsg({
      name: 'First Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'First Name',
      type: 'required',
    })
  ),
  lastName: yup.string(
    errorMsg({
      name: 'Last Name',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Last Name',
      type: 'required',
    })
  ),
  birthday: yup.string(
    errorMsg({
      name: 'Birthday',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Birthday',
      type: 'required',
    })
  ),
  phoneNo: yup.string(
    errorMsg({
      name: 'Contact Number',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Contact Number',
      type: 'required',
    })
  ),
  address: yup.string(
    errorMsg({
      name: 'Address',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Address',
      type: 'required',
    })
  ),
  nationality: yup.string(
    errorMsg({
      name: 'Nationality',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Nationality',
      type: 'required',
    })
  ),
  gender: yup.string(
    errorMsg({
      name: 'Gender',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Gender',
      type: 'required',
    })
  ),
  relationship: yup.string(
    errorMsg({
      name: 'Relationship',
      type: 'string',
    })
  ).required(
    errorMsg({
      name: 'Relationship',
      type: 'required',
    })
  ),
});

const useNextOfKin = ({ dispatch, employeeId }) => {
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
      dispatch(updateNextOfKin({ id, data:formData, employeeId }));
      close();
      return;
    }
    dispatch(addNextOfKin({formData, employeeId}));
  };

  const handleDelete = (id) => {
    dispatch(deleteNextOfKin({id, employeeId}));
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

export default useNextOfKin;