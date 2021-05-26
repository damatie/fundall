import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import errorMsg from 'utils/errorMsg';
import {
    addAccount
} from '../store/actions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
    firstName: yup.string(errorMsg({ name: 'First Name', type: 'string' }))
        .required(errorMsg({ name: 'First Name', type: 'required' }))
        .min(3, errorMsg({ name: 'First', type: 'min', number: 3 })),
    lastName: yup.string(errorMsg({ name: 'Last Name', type: 'string' }))
        .required(errorMsg({ name: 'Last Name', type: 'required' }))
        .min(3, errorMsg({ name: 'Last Name', type: 'min', number: 3 })),
    middleName: yup.string(errorMsg({ name: 'Middle Name', type: 'string' }))
        .required(errorMsg({ name: 'Middle Name', type: 'required' }))
        .min(3, errorMsg({ name: 'Middle Name', type: 'min', number: 3 })),
    userName: yup.string(errorMsg({ name: 'User Name', type: 'string' }))
        .required(errorMsg({ name: 'User Name', type: 'required' }))
        .min(3, errorMsg({ name: 'User Name', type: 'min', number: 3 })),
    email: yup.string()
        .required(errorMsg({ name: 'Email Address', type: 'required' }))
        .email(),
    phoneNumber: yup.number()
        .min(10)
        .required('Phone Number is required'),
    password: yup.string().required(errorMsg({ name: 'Password', type: 'required' })).min(4).matches(/^[a-z0-9]+$/i, 'must contain at least one number'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(errorMsg({ name: 'Confirm Password', type: 'required' })),
    companyName: yup.string(errorMsg({ name: 'Company name', type: 'string' }))
        .required(errorMsg({ name: 'Company name', type: 'required' })),
    industry: yup.string(errorMsg({ name: 'Industry', type: 'string' }))
        .required(errorMsg({ name: 'Industry', type: 'required' })),
    minNoOfEmployees: yup.number()
        .min(1)
        .required(errorMsg({ name: 'Number Of Employees', type: 'required' })),
    maxNoOfEmployees: yup.number()
        .min(1)
        .required(errorMsg({ name: 'Number Of Employees', type: 'required' })),
    contactNumber: yup.number()
        .min(10)
        .required({ name: 'Company Contact Number', type: 'required' }),
    contactEmail: yup.string()
        .required(errorMsg({ name: 'Company Contact Email', type: 'required' }))
        .email(),
});

const regHook = ({dispatch}) => {
  const {
    errors,
    getValues,
    register,
    handleSubmit,
    control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = (model) => {
    handleSubmit;
    console.log('form: ', model);
    dispatch(addAccount(model));
  };

  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
    control
  };
};

export default regHook;