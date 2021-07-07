import React from 'react';
import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import Typography from '@material-ui/core/Typography'
import 'react-phone-input-2/lib/material.css';
import SharedButton from 'app/shared/button/SharedButton';
import useCreateEmployeeInfo from './hooks/useCreateEmployeeInfo';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/store/actions';
import { Controller } from 'react-hook-form';
import SharedDropzone from 'app/shared/sharedDropZone';
import { useParams } from 'react-router';

const CreateEmployeeInfo = () => {

  const { countries, states, cities } = useSelector(state => state.regions);
  const params = useParams();
  const state = useSelector(state => state.auth.user);
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const inputs = React.useMemo(() => [
    {
      name: 'officeExtension',
      label: 'Office Extension',
      type: 'number',
    },
    {
      name: 'privateMobileNumber',
      label: 'Private Mobile Number',
      type: 'phoneNumber',
    },
    {
      name: 'officeLine',
      label: 'Office Telephone Line',
      type: 'number',
    },
    {
      name: 'officialNo',
      label: 'Official Mobile No',
      type: 'phoneNumber',
    },
    {
      name: 'alternativeEmail',
      label: 'Alternative Email/Private Email',
      type: 'email',
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      data: countries,
    },
    {
      name: 'facebookHandle',
      label: 'Facebook Handle',
      type: 'url',
    },
    {
      name: 'twitterHandle',
      label: 'Twitter Handle',
      type: 'url',
    },
    {
      name: 'linkedInHandle',
      label: 'Linkedin Handle',
      type: 'url',
    },
    {
      name: 'zipCode',
      label: 'Postal/Zip Code',
      type: 'number',
    },
    {
      name: 'employeeManager1',
      label: 'Employee Manager 1',
      // type: '',
    },
    {
      name: 'employeeManager2',
      label: 'Employee Manager 2',
      // type: '',
    },
    {
      name: 'reviewingManager',
      label: 'Reviewing Manager',
      // type: '',
    },
    {
      name: 'personalAssistant',
      label: 'Personal Assistant',
      // type: '',
    },
  ], [countries, states]);

  React.useEffect(() => {
    dispatch(Actions.getCountries());
    // dispatch(Actions.getEmployeeProfile(state.id));
    // console.log(params);
  }, []);

  const {
    onSubmit,
    handleClose,
    errors,
    register,
    handleSubmit,
    handleMenuItemClick,
    control,
    setSignature
  } = useCreateEmployeeInfo({
    dispatch,
    state
  });

  return (
    <SharedModal
      open={!!params?.id ? false : (profile.data?.info ? false : true)}
      handleClose={handleClose}
      title='Complete Registration'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridSystem>
          {inputs.map((input) => {
            if (input.type === 'select') {
              return (
                <SelectTextField
                  name={input.name}
                  label={input.label}
                  error={errors[input.name]}
                  message={errors[input.name]?.message}
                  onChange={({ target: { value, name } }) => {
                    register({
                      name,
                      value,
                    })
                  }}
                >
                  {input.data.map(({ id, name }) => (
                    <MenuItem key={id} value={id} onClick={handleMenuItemClick({ value: id, name: input.name })}>
                      {name}
                    </MenuItem>
                  ))}
                </SelectTextField>
              )
            }
            if (input.type === 'phoneNumber') {
              return (
                // <Grid item lg={12}>
                <div className=''>
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
                // </Grid>
              )

            }
            return (
              <Input
                {...input}
                error={errors[input.name]}
                message={errors[input.name]?.message}
                refs={register}
              />
            )
          })}
        </GridSystem>
        <div>
        <Typography variant="body2" color="initial" className='my-20'>{'Signature'}</Typography>
          <SharedDropzone
            setValue={setSignature}
            name='signature'
          />
        </div>
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='my-16 flex flex-col mx-auto w-1/2'
        >
          Submit
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default CreateEmployeeInfo;