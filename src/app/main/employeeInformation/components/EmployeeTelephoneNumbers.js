import React from 'react';
import Input from 'app/shared/TextInput/Input';
import Grid from '@material-ui/core/Grid'
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import 'react-phone-input-2/lib/material.css';
import { useDispatch } from 'react-redux';
import useEmployeeTelephone from '../hooks/useEmployeeTelephone';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';

const EmployeeTelephoneNumbers = ({ value, authState }) => {
  const inputs = React.useMemo(() => [
    {
      name: 'officialNo',
      label: 'Official Mobile No',
      defaultValue: value.officialNo,
      type: 'phoneNumber',
    },
    {
      name: 'officeLine',
      label: 'Office Telephone Line',
      defaultValue: value.officeLine,
      type: 'number',
    },
    {
      name: 'officeExtension',
      label: 'Office Extension',
      defaultValue: value.officeExtension,
      type: 'number',
    },
    {
      name: 'privateMobileNumber',
      label: 'Private Mobile Number',
      defaultValue: value.privateMobileNumber,
      type: 'phoneNumber',
    }
  ], []);

  const dispatch = useDispatch();

  const {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit,
    control
  } = useEmployeeTelephone({
    dispatch,
    defaultValue: value,
    state: authState
  })

  return (
    <BasicCard
      title='Telephone Number'
      button={
        <SharedButton
          color='secondary'
          variant='contained'
          onClick={handleShouldUpdate}
        >
          {shouldUpdate ? 'Cancel' : 'Edit'}
        </SharedButton>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {
            inputs.map((input) => {
              if (input.type === 'phoneNumber') {
                return (
                  <Grid item lg={12}>
                    <div className='my-16'>
                    <Controller
                    as={
                      <PhoneInput
                        id={input.name}
                        country='ng'
                        // placeholder="Enter phone number"
                        containerClass='w-full'
                        inputClass='w-full'
                        specialLabel={input.label}
                        enableAreaCodes
                        enableSearch
                        inputRef={register}
                        disabled={!shouldUpdate}
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
                    </div>
                  </Grid>
                )

              }
              return (
                <Grid item lg={12}>
                  <div className='my-16'>
                    <Input
                      {...input}
                      error={errors[input.name]}
                      message={errors[input.name]?.message}
                      refs={register}
                      disabled={!shouldUpdate}
                    />
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
        {
          shouldUpdate && (
            <SharedButton
              color='primary'
              variant='contained'
              className='flex flex-col w-1/2 mx-auto my-16'
              type='submit'
            >
              Save
            </SharedButton>
          )
        }
      </form>

    </BasicCard>
  );
};

export default EmployeeTelephoneNumbers;