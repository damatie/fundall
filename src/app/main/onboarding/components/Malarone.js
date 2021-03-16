import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createMalarone, updateMalarone } from '../store/actions';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Input from 'app/shared/TextInput/Input';
import 'react-phone-input-2/lib/material.css';

const schema = yup.object().shape({
  quantity: yup.string().required(),
});

const { useState, useMemo } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));


const Malarone = () => {

  const classes = useStyles();

  const { employeeInfo: { info } } = useSelector(state => state.onboardingForms);

  const dispatch = useDispatch();

  const inputs = useMemo(() => [
    {
      name: 'employeeName',
      label: 'Employee Name',
      type: 'text',
      defaultValue: `${info.firstName} ${info.lastName}`,
    },
    {
      name: 'quantity',
      label: 'Quantity Reveived',
      type: 'number',
      defaultValue: '',
    },
  ], [info]);

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
    console.log(formData);
    dispatch(createMalarone(formData));
  };

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>MALARONR / MALANIL ACKNOWLEDGEMENT FORM.</b></Typography>
      {/* <Typography className='my-16 w-9/12 mx-auto' variant="body1" color="initial">Employee / Consultant Bank Account Details</Typography> */}
      <section className='flex flex-row justify-center items-center my-16 mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
        {
            inputs.map((input) => {
              if (input.type === 'phoneNumber') {
                return (
                  <div>
                    <Controller
                      defaultValue={input.defaultValue}
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

              }
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
            })
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

export default Malarone;