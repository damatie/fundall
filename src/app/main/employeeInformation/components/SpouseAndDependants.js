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
import { DatePicker } from '@material-ui/pickers';
import useSpouseDependant from '../hooks/useSpouseDependants';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { getSpouseDependant } from '../store/actions';
import { getCountries } from 'app/store/actions';
import { useParams } from 'react-router';
import userPermission from '../logic/userPermission';
import { NoData } from 'app/shared/NoData';

const SpouseAndDependants = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const params = useParams();
  const authState = useSelector(state => state.auth.user);
  const getUserId = !!params?.id ? params?.id : authState.id;

  const {
    spouseDependant: { data },
    employeeInfo: {
      info: { employeeId }
    }
  } = useSelector(state => state.employeeInformation);

  const dispatch = useDispatch();

  const { canDelete, canEdit, canAdd } = userPermission({
    role: authState.role,
    userId: authState.id,
    profileId: employeeId,
  });

  React.useEffect(() => {
    dispatch(getSpouseDependant(getUserId));
    dispatch(getCountries());
  }, []);

  return (
    <BasicCard
      title='Spouse / Dependants'
      button={
        <>
          <>
            {
              canAdd() && (<SharedButton
                variant='outlined'
                color='secondary'
                onClick={handleOpen('Spouse / Dependants')}
                className='mx-16'
              >
                Add
              </SharedButton>)
            }
          </>
          <>
            {
              canEdit() && (
                <SharedButton
                  variant='contained'
                  color='secondary'
                  onClick={() => setShouldUpdate(!shouldUpdate)}
                >
                  {shouldUpdate ? 'Cancel' : 'Edit'}
                </SharedButton>)
            }

          </>
        </>
      }
    >
      {data.length === 0 ? (
        <NoData title='Spouse / Dependants' />
      ) :
      data.map((item, index) => (
        <SpouseAndDependantsDetails
          item={item}
          key={item?.id}
          index={index}
          shouldUpdate={shouldUpdate}
          setShouldUpdate={setShouldUpdate}
          canDelete={canDelete}
        />
      ))}
    </BasicCard>
  );
};

const SpouseAndDependantsDetails = ({ item, index, setShouldUpdate, shouldUpdate, canDelete }) => {
  const { countries } = useSelector(state => state.regions);

  const {
    employeeInfo: {
      info: { employeeId }
    }
  } = useSelector(state => state.employeeInformation);

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
      name: 'birthday',
      label: 'Birthday',
      type: 'date',
      data: [],
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      data: countries,
    },
    {
      name: 'educationalLevel',
      label: 'Educational Level',
      type: '',
      data: [],
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
    errors,
    register,
    handleSubmit,
    control,
    handleDelete
  } = useSpouseDependant({
    dispatch,
    employeeId
  })

  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Spouse / Dependants ({index + 1})</Typography>
        {canDelete() && (<IconButton
          aria-label="delete"
          onClick={() => handleDelete(item.id)}>
          <Icon className='text-red-500'>delete</Icon>
        </IconButton>)}
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
                          value={item[input.name]}
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
              if (input.type === 'date') {
                return (
                  <Controller
                    control={control}
                    defaultValue={item[input.name]}
                    name={input.name}
                    as={
                      <DatePicker
                        inputVariant="outlined"
                        inputRef={register}
                        label={input.label}
                        className="w-full"
                        value={item[input.name]}
                        // maxDate={dob}
                        format={'MMMM Do, YYYY'}
                        error={errors[input.name]}
                        helperText={errors[input.name]?.message}
                        disabled={!shouldUpdate}
                      />
                    }
                  />
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

export const AddSpouseAndDependant = () => {
  const { countries } = useSelector(state => state.regions);

  const dispatch = useDispatch();

  const {
    employeeInfo: {
      info: { employeeId }
    }
  } = useSelector(state => state.employeeInformation);

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
      name: 'birthday',
      label: 'Birthday',
      type: 'date',
      data: [],
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      data: countries,
    },
    {
      name: 'educationalLevel',
      label: 'Educational Level',
      type: '',
      data: [],
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
  } = useSpouseDependant({
    dispatch,
    employeeId
  })

  return (
    <form onSubmit={handleSubmit(onSubmit())}>
      <GridSystem>
        {
          inputs.map((input) => {
            if (input.type === 'select') {
              return (
                <Controller
                  name={input.name}
                  control={control}
                  rules={{ required: true }}
                  // defaultValue={item[input.name]}
                  as={
                    <SelectTextField
                      name={input.name}
                      label={input.label}
                      error={errors[input.name]}
                      message={errors[input.name]?.message}
                      // defaultValue={item[input.name]}
                      // disabled={!shouldUpdate}
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
                    // defaultValue={item[input.name]}
                    as={
                      <PhoneInput
                        // value={item[input.name]}
                        // disabled={!shouldUpdate}
                        // value={item[input.name]}
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
            if (input.type === 'date') {
              return (
                <Controller
                  control={control}
                  // defaultValue={item[input.name]}
                  name={input.name}
                  as={
                    <DatePicker
                      inputVariant="outlined"
                      inputRef={register}
                      label={input.label}
                      className="w-full"
                      // value={item[input.name]}
                      // maxDate={dob}
                      format={'MMMM Do, YYYY'}
                      error={errors[input.name]}
                      helperText={errors[input.name]?.message}
                    // disabled={!shouldUpdate}
                    />
                  }
                />
              )
            }
            return (
              <Input
                {...input}
                // defaultValue={item[input.name]}
                // disabled={!shouldUpdate}
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
        className='flex mx-auto w-1/2 my-16'
        type='submit'
      >
        Add
      </SharedButton>
    </form>
  );
};
export default SpouseAndDependants;