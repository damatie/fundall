import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import useEmployeeProfile from '../hooks/useEmployeeProfile';
import SharedButton from 'app/shared/button/SharedButton';

const EmployeeProfile = ({ value }) => {
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
        name: 'surname',
        label: 'Surname',
        defaultValue: value.surname,
      },
      {
        name: 'srgn',
        label: 'SRGN',
        defaultValue: value.srgn,
      },
      {
        name: 'gender',
        label: 'Gender',
        defaultValue: value.gender,
        type: 'select',
        data: ['Male', 'Female', 'Others']
      },
      {
        name: 'maritalStatus',
        label: 'Marital Status',
        defaultValue: value.maritalStatus,
        type: 'select',
        data: ['Single', 'Married', 'Divorced', 'Complicated']
      },
      {
        name: 'nickname',
        label: 'Nickname',
        defaultValue: value.nickname,
      }
    ], [value]);

  const {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit
  } = useEmployeeProfile({
    defaultValue: value
  })

  return (
    <BasicCard
      title='Employee Profile Information'
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
                <SelectTextField
                  name={input.name}
                  label={input.label}
                  error={errors[input.name]}
                  message={errors[input.name]?.message}
                  onChange={({ target: { name, value } }) => register({ name, value })}
                  defaultValue={input.defaultValue}
                  disabled={!shouldUpdate}
                >
                  {input.data.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </SelectTextField>
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