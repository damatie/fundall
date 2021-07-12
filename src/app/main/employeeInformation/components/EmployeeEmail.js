import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import useEmployeeEmail from '../hooks/useEmployeeEmail';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import 'react-phone-input-2/lib/material.css';
import Typography from '@material-ui/core/Typography';
import { DatePicker } from '@material-ui/pickers';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import userPermission from '../logic/userPermission';
import { getCountries } from '../services';

const { useState, useEffect } = React;

const EmployeeEmail = ({ value, authState }) => {
  // const { countries, states, cities } = useSelector(state => state.regions);

  const [countries, setCountries] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getCountries().then(data => setCountries(data));
  }, []);

  const {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit,
    control,
    handleMenuItemClick,
    states,
    cities
  } = useEmployeeEmail({
    defaultValue: value,
    state: authState,
    dispatch
  })

  
  const inputs = React.useMemo(() => [
    {
      name: 'alternativeEmail',
      label: 'Alternative Email',
      type: 'email',
      defaultValue: value.alternativeEmail
    },
    {
      name: 'DOB',
      label: 'Employee DOB',
      defaultValue: value.DOB,
      type: 'date',
      maxDate: new Date()
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
      name: 'nationality',
      label: 'Employee County',
      defaultValue: value.nationality,
      type: 'select',
      data: countries,
      fieldName: 'id'
    },
    {
      name: 'stateOfOrigin',
      label: 'Employee State of Origin',
      defaultValue: value.stateOfOrigin,
      type: 'select',
      data: states
    },
    {
      name: 'LGA',
      label: 'Employee LGA / City',
      defaultValue: value.LGA,
      type: 'select',
      data: cities
    },
    {
      name: 'zipCode',
      type: 'number',
      label: 'Postal / Zip Code',
      defaultValue: value.zipCode,
    },
    {
      name: 'nearestAirportToResidence',
      label: 'Nearest Airport to Residence',
      defaultValue: value.nearestAirportToResidence,
      type: '',
    },
    {
      name: 'internationalPassportNumber',
      label: 'Passport Number',
      defaultValue: value.internationalPassportNumber,
      type: '',
    },
    {
      name: 'internationalPassportNumberExpirationDate',
      label: 'Passport Expiration Date',
      defaultValue: value.internationalPassportNumberExpirationDate,
      type: 'date',
    },
  ], [value, countries, states, cities]);


  const { canEdit } = userPermission({
    role: authState.role,
    userId: authState.id,
    profileId: value.employeeId,
  });

  return (
    <BasicCard
      title='Employee Information'
      button={
        canEdit() && (<SharedButton
          color='secondary'
          variant='contained'
          onClick={handleShouldUpdate}
        >
          {shouldUpdate ? 'Cancel' : 'Edit'}
        </SharedButton>)
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
              if (input.type === 'date') {
                return (
                  <Controller
                    control={control}
                    defaultValue={input.defaultValue}
                    name={input.name}
                    as={
                      <DatePicker
                        inputVariant="outlined"
                        inputRef={register}
                        value={input.defaultValue}
                        label={input.label}
                        className="w-full"
                        maxDate={input.maxDate}
                        format={'MMMM Do, YYYY'}
                        error={errors[input.name]}
                        helperText={errors[input.name]?.message}
                        disabled={!shouldUpdate}
                      />
                    }
                  />
                )
              }
              if (input.type === 'select') {
                return (
                  <Controller
                    name={input.name}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={input.defaultValue}
                    as={
                      <SelectTextField
                        name={input.name}
                        label={input.label}
                        error={errors[input.name]}
                        message={errors[input.name]?.message}
                        defaultValue={input.defaultValue}
                        disabled={!shouldUpdate}
                        refs={register}

                      >
                        {input.data.map(({ id, name }) => (
                          <MenuItem
                            key={id}
                            value={input?.fieldName ? id : name}
                            onClick={handleMenuItemClick({ value: id, name: input.name })}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </SelectTextField>
                    }
                  />

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