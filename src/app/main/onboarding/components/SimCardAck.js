import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createSimCardAck, updateSimCardAck, getSimCardAck } from '../store/actions';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Input from 'app/shared/TextInput/Input';
import Skeleton from '@material-ui/lab/Skeleton';
import useUserID from '../hooks/useUserID';
import 'react-phone-input-2/lib/material.css';

const schema = yup.object().shape({
  item: yup.string().required().min(3),
  productSerialNumber: yup.string().required(),
  colour: yup.string().required(),
  companySerialNumber: yup.string().required(),
  simPhoneNumber: yup.string().required().min(14).max(14),
  quantity: yup.string().required()
});

const { useState, useMemo, useEffect, memo } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));


const SimCardAck = () => {

  const classes = useStyles();

  const {
    employeeInfo: { info },
    onboardingForms: {
      simCardAck: {
        loading,
        data,
      }
    }
  } = useSelector(state => state.onboardingForms);

  const dispatch = useDispatch();

  const {
    id
  } = useUserID();

  useEffect(() => {
    !!id && dispatch(getSimCardAck(id));
  }, [id]);

  const inputs = useMemo(() => [
    {
      name: 'item',
      label: 'item',
      type: 'text',
      defaultValue: data?.item,
    },
    {
      name: 'productSerialNumber',
      label: 'Product Serial Number',
      type: 'text',
      defaultValue: data?.productSerialNumber,
    },
    {
      name: 'colour',
      label: 'Colour',
      type: 'text',
      defaultValue: data?.colour,
    },
    {
      name: 'companySerialNumber',
      label: 'Company Serial Number',
      type: 'text',
      defaultValue: data?.companySerialNumber,
    },
    {
      name: 'simPhoneNumber',
      label: 'Sim Phone Number',
      type: 'phoneNumber',
      defaultValue: data?.simPhoneNumber,
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'text',
      defaultValue: data?.quantity,
    }
  ], [data]);

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
    if(Object.entries(data).length > 0) {
      dispatch(updateSimCardAck({formData, id}));
      return;
    }
    dispatch(createSimCardAck({formData, id}));
  };

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>SIM CARD ACKNOWLEDGEMENT FORM</b></Typography>
      <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">Please acknowledge the receipt of the following</Typography>
      <section className='flex flex-row justify-center items-center my-16 mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            inputs.map((input) => (
              <>
                {
                  loading ? (
                    <Skeleton variant="rect" width={500} height={50} animation="wave" className='my-16'/>
                  ) : (
                    <SimCardAckForm
                      input={input}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  )
                }
              </>
            ))
          }
          <Button
            className='mx-auto w-4/12 my-16'
            variant="contained"
            color="primary"
            type='submit'
          >
            Submit
        </Button>
        </form>
      </section>
    </section>
  );
};

const SimCardAckForm = ({ input, control, errors, register }) => {
  if (input.type === 'phoneNumber') {
    return (
      <div>
        <Controller
          // defaultValue={item[input.name]}
          as={
            <PhoneInput
              // value={item[input.name]}
              value={input.defaultValue}
              id={input.name}
              country='ng'
              // placeholder="Enter phone number"
              containerClass='w-full my-16'
              inputClass='w-full'
              specialLabel={input.label}
              enableAreaCodes
              enableSearch
              inputRef={register}
              isValid={(inputNumber, country, onlyCountries) => {
                return onlyCountries.some((country) => {
                  return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                });
              }}
            />
          }
          name={input.name}
          control={control}
          rules={{ required: true }}
        />
        <Typography variant="caption" color="error">{errors[input.name]?.message}</Typography>
      </div>
    )

  } else {
    return (
      <Input
        {...input}
        // defaultValue={item[input.name]}
        error={errors[input.name]}
        message={errors[input.name]?.message}
        refs={register}
        className='my-16'
      />
    )
  }
}

export default memo(SimCardAck);