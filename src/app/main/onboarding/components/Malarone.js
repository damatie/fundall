import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createMalarone, updateMalarone, getMalarone } from '../store/actions';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Input from 'app/shared/TextInput/Input';
import useUserID from '../hooks/useUserID';
import Skeleton from '@material-ui/lab/Skeleton';
import { useParams } from 'react-router-dom';
import 'react-phone-input-2/lib/material.css';

const schema = yup.object().shape({
  quantityReceived: yup.string().required(),
});

const { useState, useMemo, useEffect, memo } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));


const Malarone = () => {

  const classes = useStyles();

  const {
    employeeInfo: { info },
    onboardingForms: {
      malarone: {
        loading,
        data,
      }
    }
  } = useSelector(state => state.onboardingForms);

  const dispatch = useDispatch();

  const params = useParams();

  const inputs = useMemo(() => [
    {
      name: 'employeeName',
      label: 'Employee Name',
      type: 'text',
      defaultValue: `${info.firstName} ${info.lastName}`,
    },
    {
      name: 'quantityReceived',
      label: 'Quantity Reveived',
      type: 'number',
      defaultValue: data?.quantityReceived,
    },
  ], [info, data]);

  const { id } = useUserID();

  useEffect(() => {
    !!id && dispatch(getMalarone(id))
  }, [id]);

  const {
    control,
    register,
    errors,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    if (Object.entries(data).length > 0) {
      dispatch(updateMalarone({ formData, id }));
      return;
    }
    dispatch(createMalarone({ formData, id }));
  };

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>MALARONE / MALANIL ACKNOWLEDGEMENT FORM.</b></Typography>
      {/* <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">Employee / Consultant Bank Account Details</Typography> */}
      <section className='flex flex-row justify-center items-center my-16 mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            inputs.map((input) => (
              <>
                {
                  loading ? (
                    <Skeleton variant="rect" width={500} height={50} animation="wave" className='my-16' />
                  ) : (
                    <Input
                      {...input}
                      // defaultValue={item[input.name]}
                      error={errors[input.name]}
                      message={errors[input.name]?.message}
                      refs={register}
                      className='my-16'
                      disabled={!!params?.id}
                    />
                  )
                }
              </>
            ))
          }
          {
            !(!!params?.id) && (
              <Button
                className='mx-auto w-4/12 my-16'
                variant="contained"
                color="primary"
                type='submit'
              >
                Submit
              </Button>
            )
          }
        </form>
      </section>
    </section>
  );
};

export default Malarone;