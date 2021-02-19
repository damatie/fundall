import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import 'react-phone-input-2/lib/material.css';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { useSelector, useDispatch } from 'react-redux';
import useEmergencyContact from '../hooks/useEmergencyContact';
import { Controller } from 'react-hook-form';
import { getEmergencyContact } from '../store/actions';
import { getCountries } from 'app/store/actions';

const EmergencyContacts = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.employeeInformation.emergencyContact);

  React.useEffect(() => {
    dispatch(getEmergencyContact());
    dispatch(getCountries());
  }, []);


  return (
    <BasicCard
      title='Emergency Contact'
      button={
        <>
          <SharedButton
            variant='outlined'
            color='secondary'
            onClick={handleOpen('Emergency Contact')}
            className='mx-16'
          >
            Add
          </SharedButton>
          <SharedButton
            variant='contained'
            color='secondary'
            onClick={() => setShouldUpdate(!shouldUpdate)}
          >
            {shouldUpdate ? 'Cancel' : 'Edit'}
          </SharedButton>
        </>
      }
    >
      {data.map((item, index) => (
        <EmergencyContactsDetails
          item={item}
          key={item?.id}
          index={index}
          shouldUpdate={shouldUpdate}
          setShouldUpdate={setShouldUpdate}
        />
      ))}
    </BasicCard>
  );
};

const EmergencyContactsDetails = ({ item, index, setShouldUpdate, shouldUpdate }) => {
  const { countries } = useSelector(state => state.regions);

  const dispatch = useDispatch();

  const inputs = React.useMemo(() => [
    {
      name: 'firstName',
      label: 'First Name',
      type: '',
      data: [],
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: '',
      data: [],
    },
    {
      name: 'address',
      label: 'Address',
      type: '',
      data: [],
    },
    {
      name: 'contactNumber',
      label: 'Contact Number',
      type: 'phoneNumber',
      data: [],
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      data: countries,
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      data: [
        {
          name: 'male',
          id: 'male',
        },
        {
          name: 'female',
          id: 'female',
        },
        {
          name: 'others',
          id: 'others',
        },
      ],
    },
    {
      name: 'relationship',
      label: 'Relationship',
      type: 'select',
      data: [
        {
          name: 'wife',
          id: 'wife',
        },
        {
          name: 'children',
          id: 'children',
        },
        {
          name: 'brother',
          id: 'brother',
        },
        {
          name: 'sister',
          id: 'sister'
        }
      ],
    },
  ], [countries]);

  const close = () => {
    setShouldUpdate(false);
  }

  const {
    onSubmit,
    handleDelete,
    errors,
    register,
    handleSubmit,
    control
  } = useEmergencyContact({
    dispatch,
  })

  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Emergency Contact ({index + 1})</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(item.id)}>
          <Icon className='text-red-500'>delete</Icon>
        </IconButton>
      </div>
      <form onSubmit={handleSubmit(onSubmit(item.id, close))}>
        <GridSystem>
          {
            inputs.map((input) => {
              if (input.type === 'select') {
                return (
                  <Controller
                    name={input.name}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={item[input.name]}
                    as={
                      <SelectTextField
                        name={input.name}
                        label={input.label}
                        error={errors[input.name]}
                        message={errors[input.name]?.message}
                        defaultValue={item[input.name]}
                        disabled={!shouldUpdate}
                        refs={register}
                      >
                        {input.data.map(({ id, name }) => (
                          <MenuItem
                            key={id}
                            value={name}
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
                  <div>
                    <Controller
                      defaultValue={item[input.name]}
                      as={
                        <PhoneInput
                          value={item[input.name]}
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
                )

              }
              return (
                <Input
                  {...input}
                  defaultValue={item[input.name]}
                  disabled={!shouldUpdate}
                  error={errors[input.name]}
                  message={errors[input.name]?.message}
                  refs={register}
                />
              )
            })
          }
        </GridSystem>
        {shouldUpdate && (<SharedButton
          variant='contained'
          color='primary'
          className='w-1/2 flex flex-col mx-auto my-16'
          type='submit'
        >
          Update
        </SharedButton>)}
      </form>
      <Divider className='my-16' />
    </>
  )
}

export const AddEmergencyContact = () => {
  const { countries } = useSelector(state => state.regions);

  const dispatch = useDispatch();

  const inputs = React.useMemo(() => [
    {
      name: 'firstName',
      label: 'First Name',
      type: '',
      data: [],
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: '',
      data: [],
    },
    {
      name: 'address',
      label: 'Address',
      type: '',
      data: [],
    },
    {
      name: 'contactNumber',
      label: 'Contact Number',
      type: 'phoneNumber',
      data: [],
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      data: countries,
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      data: [
        {
          name: 'male',
          id: 'male',
        },
        {
          name: 'female',
          id: 'female',
        },
        {
          name: 'others',
          id: 'others',
        },
      ],
    },
    {
      name: 'relationship',
      label: 'Relationship',
      type: 'select',
      data: [
        {
          name: 'wife',
          id: 'wife',
        },
        {
          name: 'children',
          id: 'children',
        },
        {
          name: 'brother',
          id: 'brother',
        },
        {
          name: 'sister',
          id: 'sister'
        }
      ],
    },
  ], [countries]);

  const {
    onSubmit,
    errors,
    register,
    handleSubmit,
    control
  } = useEmergencyContact({
    dispatch,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit())} className='my-16'>
      <GridSystem>
        {
          inputs.map((input) => {
            if (input.type === 'select') {
              return (
                <Controller
                  name={input.name}
                  control={control}
                  rules={{ required: true }}
                  as={
                    <SelectTextField
                      name={input.name}
                      label={input.label}
                      error={errors[input.name]}
                      message={errors[input.name]?.message}
                      refs={register}
                    >
                      {input.data.map(({ id, name }) => (
                        <MenuItem
                          key={id}
                          value={name}
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
                <div>
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
                  <Typography variant="caption" color="error">{errors[input.name]?.message}</Typography>
                </div>
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
          })
        }
      </GridSystem>
      <SharedButton
        variant='contained'
        color='primary'
        className='flex w-1/2 mx-auto my-16'
        type='submit'
      >
        Add
      </SharedButton>
    </form>
  );
};
export default EmergencyContacts;