import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import useEmployeeEmail from '../hooks/useEmployeeEmail';
import { useDispatch } from 'react-redux';

const EmployeeEmail = ({value, authState}) => {
  const inputs = React.useMemo(() => [
    {
      name: 'officialEmail',
      label: 'Official Email',
      type: 'email',
      defaultValue: value.officialEmail
    },
    {
      name: 'alternativeEmail',
      label: 'Alternative Email',
      type: 'email',
      defaultValue: value.alternativeEmail
    },
    {
      name: 'facebookHandle',
      label: 'Facebook Handle',
      type: 'url',
      defaultValue: value.facebookHandle
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
    }
  ], [value]);
  const dispatch = useDispatch();
  
  const {
    errors,
    register,
    handleSubmit,
    shouldUpdate,
    handleShouldUpdate,
    onSubmit
  } = useEmployeeEmail({
    defaultValue: value,
    state: authState,
    dispatch
  })

  return (
    <BasicCard
      title='Email'
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
            inputs.map((input) => (
              <Input
                {...input}
                error={errors[input.name]}
                message={errors[input.name]?.message}
                refs={register}
                disabled={!shouldUpdate}
              />
            ))
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