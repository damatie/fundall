import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import useEmployeeEmail from '../hooks/useEmployeeEmail';
import { useDispatch } from 'react-redux';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import 'react-phone-input-2/lib/material.css';
import Typography from '@material-ui/core/Typography';

const EmployeeEmail = ({ value, authState }) => {
  const inputs = React.useMemo(() => [
    {
      name: 'alternativeEmail',
      label: 'Alternative Email',
      type: 'email',
      defaultValue: value.alternativeEmail
    },
    {
      name: 'faceBookHandle',
      label: 'Facebook Handle',
      type: 'url',
      defaultValue: value.faceBookHandle
    },
    {
      name: 'linkedInHandle',
      label: 'LinkedIn Handle',
      type: 'url',
      defaultValue: value.linkedInHandle
    },
    {
      name: 'instagramInHandle',
      label: 'Instagram Handle',
      type: 'url',
      defaultValue: value.instagramInHandle
    },
    {
      name: 'twitterHandle',
      label: 'Twitter Handle',
      type: 'url',
      defaultValue: value.twitterHandle
    },
    {
      name: 'zipCode',
      type: 'number',
      label: 'Postal / Zip Code',
      defaultValue: value.zipCode,
    },
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
  ], [value]);
  const dispatch = useDispatch();

  const {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit,
    control
  } = useEmployeeEmail({
    defaultValue: value,
    state: authState,
    dispatch
  })

  return (
    <BasicCard
      title='Employee Information'
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
        <GridSystem>
          {
            inputs.map((input) => {
              if (input.type === 'phoneNumber') {
                return (
                  // <Grid item lg={12}>
                  <div>
                    <Controller
                      defaultValue={input.defaultValue}
                      as={
                        <PhoneInput
                          id={input.name}
                          country='ng'
                          // placeholder="Enter phone number"
                          value={input.defaultValue}
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
                    <Typography variant="caption" color="error">{errors[input.name]?.message}</Typography>
                  </div>
                  // </Grid>
                )

              }
              return (<Input
                {...input}
                error={errors[input.name]}
                message={errors[input.name]?.message}
                refs={register}
                disabled={!shouldUpdate}
              />)
            })
          }
        </GridSystem>
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

export default EmployeeEmail;