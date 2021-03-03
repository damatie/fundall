import React from 'react';
import Input from 'app/shared/TextInput/Input';
import BasicCard from './components/BasicCard';
import GridSystem from 'app/shared/gridSystem';
import useEmployeeCompensation from './hooks/useEmployeeCompensation';
import { Controller } from 'react-hook-form';
import SharedButton from 'app/shared/button/SharedButton';
import { useDispatch, useSelector } from 'react-redux';
import { getCompensationColumns } from 'app/main/compensationColumns/store/actions';
import userPermission from './logic/userPermission';
import Skeleton from '@material-ui/lab/Skeleton';

const EmployeeCompensation = () => {
  const dispatch = useDispatch();

  const authState = useSelector(state => state.auth.user);

  const {
    compensationColumns: { data, loading },
    employeeInfo: {
      info
    }
  } = useSelector(state => state.employeeInformation);

  React.useEffect(() => {
    dispatch(getCompensationColumns());
  }, []);

  const { editCompensation, canEdit } = userPermission({
    role: authState.role,
    userId: authState.id,
    profileId: info.id,
  });

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
    state: info
  });

  return (
    <BasicCard
      title='Compensation'
      button={
        (editCompensation() || canEdit()) && (<SharedButton
          color='secondary'
          variant='contained'
          onClick={handleShouldUpdate}
        >
          {shouldUpdate ? 'Cancel' : 'Edit'}
        </SharedButton>)
      }
    >
      {
        loading ? (
          <Skeleton variant="rect" width='100%' height={400} animation="wave" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
        <GridSystem>
          {
            compensationColumns(data).map((input) => (
              <Controller
                name={input.name}
                control={control}
                rules={{ required: true }}
                defaultValue={!!info.compensationDetails && info.compensationDetails[input.name]}
                as={
                  <Input
                    {...input}
                    error={errors[input.name]}
                    message={errors[input.name]?.message}
                    ref={register}
                    type='number'
                    defaultValue={!!info.compensationDetails && info.compensationDetails[input.name]}
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
        )
      }
    </BasicCard>
  );
};

export default EmployeeCompensation;