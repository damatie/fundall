import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import {
  addEmergencyContact,
  deleteEmergencyContact,
  updateEmergencyContact,
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
  contactNumber: yup.string(
    errorMsg({
      name: 'Contact Number',
      type: 'string',
    })
  ).max(
    14,
    errorMsg({
      name: 'Contact Number',
      type: 'max',
      number: 14,
    })
  ).min(
    14,
    errorMsg({
      name: 'Contact Number',
      type: 'min',
      number: 14,
    })
  ).required(
    errorMsg({
      name: 'Contact Number',
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

const useEmergencyContact = ({ dispatch, employeeId }) => {
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
      dispatch(updateEmergencyContact({ id, data:formData, employeeId }));
      close();
      return;
    }
    dispatch(addEmergencyContact({formData, employeeId}));
  };

  const handleDelete = (id) => {
    dispatch(deleteEmergencyContact({id, employeeId}));
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

export default useEmergencyContact;