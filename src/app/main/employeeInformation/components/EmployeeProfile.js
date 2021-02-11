import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import useEmployeeProfile from '../hooks/useEmployeeProfile';
import SharedButton from 'app/shared/button/SharedButton';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import * as Actions from 'app/store/actions';
import 'react-phone-input-2/lib/material.css';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Typography from '@material-ui/core/Typography'

const EmployeeProfile = ({ value, authState }) => {
  const { countries, states } = useSelector(state => state.regions);

  const inputs = React.useMemo(() =>
    [
      {
        name: 'title',
        label: 'Title',
        defaultValue: value.title,
      },
      {
        name: 'firstName',
        label: 'First Name',
        defaultValue: value.firstName,
      },
      {
        name: 'middleName',
        label: 'Middle Name',
        defaultValue: value.middleName,
      },
      {
        name: 'lastName',
        label: 'Surname',
        defaultValue: value.lastName,
      },
      {
        name: 'nickName',
        label: 'Nick Name',
        defaultValue: value.nickName
      },
      {
        name: 'email',
        label: 'Official Email',
        defaultValue: value.email,
      },
      {
        name: 'phoneNumber',
        label: 'Mobile Number',
        defaultValue: value.phoneNumber,
        type: 'phoneNumber'
      },
      {
        name: 'srgIdNumber',
        label: 'SRG ID Number',
        defaultValue: value.srgIdNumber,
      },
      {
        name: 'gender',
        label: 'Gender',
        defaultValue: value.gender,
        type: 'select',
        data: [
          {
            id: 'male',
            name: 'male'
          },
          {
            id: 'female',
            name: 'female'
          },
          {
            id: 'others',
            name: 'others'
          }
        ]
      },
      {
        name: 'maritalStatus',
        label: 'Marital Status',
        defaultValue: value.maritalStatus,
        type: 'select',
        data: [

          {
            id: 'single',
            name: 'single',
          },
          {
            id: 'married',
            name: 'married',
          },
          {
            id: 'divorced',
            name: 'divorced',
          },
          {
            id: 'complicated',
            name: 'complicated',
          }
        ]
      },
      {
        name: 'country',
        label: 'Country',
        defaultValue: value.country,
        data: countries,
        type: 'select'
      },
      {
        name: 'cityOfResidence',
        label: 'City of Residence',
        defaultValue: value.cityOfResidence,
        data: states,
        type: 'select'
      },
      {
        name: 'residentialAddress',
        label: 'Residential Address',
        defaultValue: value.residentialAddress,
      }
    ], [value, states, countries]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(value);
  }, [value]);

  React.useEffect(() => {
    dispatch(Actions.getCountries());
    // dispatch(Actions.getEmployeeProfile(state.id));
  }, []);

  const {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit,
    control,
    handleMenuItemClick
  } = useEmployeeProfile({
    defaultValue: value,
    state: authState,
    dispatch
  })

  return (
    <BasicCard
      title='Employee Profile'
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
          {inputs.map((input) => {
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
                          value={name}
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
            if (input.type === 'phoneNumber') {
              return (
                // <Grid item lg={12}>
                <div className=''>
                  <Controller
                    defaultValue={input.defaultValue}
                    as={
                      <PhoneInput
                        disabled={!shouldUpdate}
                        value={input.defaultValue}
                        id={input.name}
                        country='ng'
                        // placeholder="Enter phone number"
                        containerClass='w-full'
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
                // </Grid>
              )

            }
            return (
              <Input
                {...input}
                error={errors[input.name]}
                message={errors[input.name]?.message}
                refs={register}
                disabled={!shouldUpdate}
              />
            )
          })}
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

export default EmployeeProfile;