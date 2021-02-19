import React from 'react';
import Input from 'app/shared/TextInput/Input';
import BasicCard from './components/BasicCard';
import GridSystem from 'app/shared/gridSystem';
import useEmployeeCompensation from './hooks/useEmployeeCompensation';
import { Controller } from 'react-hook-form';
import SharedButton from 'app/shared/button/SharedButton';
import { useDispatch, useSelector } from 'react-redux';
import { getCompensationColumns } from 'app/main/compensationColumns/store/actions';

const EmployeeCompensation = () => {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.profile.data);

  const { data, loading } = useSelector(state => state.employeeInformation.compensationColumns);

  React.useEffect(() => {
    dispatch(getCompensationColumns());
  }, []);

  const {
    onSubmit,
    errors,
    register,
    handleSubmit,
    compensationColumns,
    control,
    handleShouldUpdate,
    shouldUpdate
  } = useEmployeeCompensation({
    dispatch,
    state: profile
  });

  return (
    <BasicCard
      title='Compensation'
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
            compensationColumns(data).map((input) => (
              <Controller
                name={input.name}
                control={control}
                rules={{ required: true }}
                defaultValue={!!profile.info.compensationDetails && profile.info.compensationDetails[input.name]}
                as={
                  <Input
                    {...input}
                    error={errors[input.name]}
                    message={errors[input.name]?.message}
                    ref={register}
                    type='number'
                    defaultValue={!!profile.info.compensationDetails && profile.info.compensationDetails[input.name]}
                    disabled={!shouldUpdate}
                  />
                }
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

export default EmployeeCompensation;