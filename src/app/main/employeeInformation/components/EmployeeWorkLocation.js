import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import useEmployeeLocation from '../hooks/useEmployeeLocation';
import * as  Actions from 'app/store/actions';
import { Controller } from 'react-hook-form';
import SharedButton from 'app/shared/button/SharedButton';

const EmployeeWorkLocation = ({ value, authState }) => {
  const { countries, states, cities } = useSelector(state => state.regions);

  const dispatch = useDispatch();

  const inputs = React.useMemo(() => [
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      defaultValue: value.country,
      data: countries
    },
    {
      name: 'cityOfResidence',
      type: 'select',
      label: 'City',
      defaultValue: value.cityOfResidence,
      data: states
    },
    {
      name: 'contactAddress',
      type: 'text',
      label: 'Contact Address',
      defaultValue: value.contactAddress,
    },
    // {
    //   name: '',
    //   type: 'select',
    //   label: 'State',
    //   defaultValue: '',
    //   data: []
    // },
    {
      name: 'zipCode',
      type: 'number',
      label: 'Postal / Zip Code',
      defaultValue: value.zipCode,
    },
  ], [countries, states]);

  React.useState(() => {
    dispatch(Actions.getCountries());
    dispatch(Actions.getStates(value.country));
  }, [])

  const {
    handleMenuItemClick,
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit,
    control
  } = useEmployeeLocation({
    dispatch,
    state: authState,
    defaultValue: value
  });

  return (
    <BasicCard
      title='Office And Work Location'
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
          {inputs.map((input) => {
            if (input.type === 'select') {
              return (
                <Grid item lg={12}>
                  <div className='my-16'>
                    <Controller
                      name={input.name}
                      control={control}
                      as={
                        <SelectTextField
                          disabled={!shouldUpdate}
                          label={input.label}
                          error={errors[input.name]}
                          message={errors[input.name]?.message}
                        >
                          {input.data.map(({ id, name }) => (
                            <MenuItem key={id} value={id} onClick={handleMenuItemClick({ value: id, name: input.name })}>
                              {name}
                            </MenuItem>
                          ))}
                        </SelectTextField>
                      }
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
          })}
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

export default EmployeeWorkLocation;