import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createBankAccountInfo, updateBankAccountInfo, getBankAccountInfo } from '../store/actions';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Input from 'app/shared/TextInput/Input';
import useUserID from '../hooks/useUserID';
import { useParams } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import 'react-phone-input-2/lib/material.css';

const schema = yup.object().shape({
  bankName: yup.string().required(),
  bankBranch: yup.string().required(),
  accountNumber: yup.string().required(),
  bankAddress: yup.string().required(),
  abaRoutingNo: yup.string().required(),
  swiftCode: yup.string().required(),
  sortCode: yup.string().required(),
  iban: yup.string().required()
});

const { useState, useMemo, useEffect, memo } = React;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  }
}));


const BankAccountInfo = () => {

  const classes = useStyles();

  const params = useParams();

  const {
    employeeInfo: { info },
    onboardingForms: {
      bankAccountInfo: {
        loading,
        data,
      }
    }
  } = useSelector(state => state.onboardingForms);

  const dispatch = useDispatch();

  const inputs = useMemo(() => [
    {
      name: 'employeeName',
      label: 'Employee Name',
      type: 'text',
      defaultValue: `${info.firstName} ${info.lastName}`,
    },
    {
      name: 'employeeNumber',
      label: 'Employee Number',
      type: 'text',
      defaultValue: `${info.srgIdNumber}`,
    },
    {
      name: 'bankName',
      label: 'Bank Name',
      type: 'text',
      defaultValue: data?.bankName,
    },
    {
      name: 'bankBranch',
      label: 'Bank Branch',
      type: 'text',
      defaultValue: data?.bankBranch,
    },
    {
      name: 'accountNumber',
      label: 'Account Number',
      type: 'number',
      defaultValue: data?.accountNumber,
    },
    {
      name: 'bankAddress',
      label: 'Bank Address',
      type: 'text',
      defaultValue: data?.bankAddress,
    },
    {
      name: 'abaRoutingNo',
      label: 'ABA ROUTING No',
      type: 'text',
      defaultValue: data?.abaRoutingNo,
    },
    {
      name: 'swiftCode',
      label: 'SWIFT CODE',
      type: 'text',
      defaultValue: data?.swiftCode,
    },
    {
      name: 'sortCode',
      label: 'SORT CODE',
      type: 'text',
      defaultValue: data?.sortCode,
    },
    {
      name: 'iban',
      label: 'IBAN',
      type: 'text',
      defaultValue: data?.iban,
    },
  ], [info, data]);

  const { id } = useUserID();

  useEffect(() => {
    !!id && dispatch(getBankAccountInfo(id))
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
      dispatch(updateBankAccountInfo({ formData, id }));
      return;
    }
    dispatch(createBankAccountInfo({ formData, id }));
  };

  return (
    <section className={classes.root}>
      <Typography className='my-16' variant="h5" color="initial"><b>EMPLOYEE BANK ACCOUNT INFORMATION</b></Typography>
      <Typography className='my-16' variant="body1" color="initial">Employee / Consultant Bank Account Details</Typography>
      <section className='flex flex-row justify-center items-center my-16 mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            inputs.map((input) => (
              <>
                {
                  loading ? (
                    <Skeleton variant="rect" width={'100%'} height={50} animation="wave" className='my-16' />
                  ) : (
                    <BankAccountInfoForm
                      input={input}
                      control={control}
                      errors={errors}
                      register={register}
                      params={params}
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

const BankAccountInfoForm = ({ params, control, errors, input, register }) => {
  if (input.type === 'phoneNumber') {
    return (
      <div>
        <Controller
          defaultValue={input.defaultValue}
          as={
            <PhoneInput
            disabled={!!params?.id}
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
      disabled={!!params?.id}
      // defaultValue={item[input.name]}
      error={errors[input.name]}
      message={errors[input.name]?.message}
      refs={register}
      className='my-16'
    />
  )
}

export default memo(BankAccountInfo);