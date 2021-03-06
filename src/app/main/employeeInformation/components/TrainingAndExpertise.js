import React from 'react';
import Input from 'app/shared/TextInput/Input';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { DatePicker } from '@material-ui/pickers';
import useTrainingAndExpertise from '../hooks/useTraining';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { getTrainingAndExpertise } from '../store/actions';
import { useParams } from 'react-router';
import userPermission from '../logic/userPermission';
import { NoData } from 'app/shared/NoData';

const TrainingAndExpertise = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const params = useParams();
  const authState = useSelector(state => state.auth.user);
  const getUserId = !!params?.id ? params?.id : authState.id;

  const {
    training: { data },
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
    dispatch(getTrainingAndExpertise(getUserId));
  }, []);

  return (
    <BasicCard
      title='Training And Expertise'
      button={
        <>
          <>
            {
              canAdd() && (<SharedButton
                variant='outlined'
                color='secondary'
                onClick={handleOpen('Training And Expertise')}
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
      { data.length === 0 ? (
        <NoData title='Training And Expertise' />
      ) :
      data.map((item, index) => (
        <TrainingAndExpertiseDetails
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

const TrainingAndExpertiseDetails = ({ item, index, setShouldUpdate, shouldUpdate, canDelete }) => {
  const inputs = React.useMemo(() => [
    {
      name: 'training',
      label: 'Training',
      type: '',
      data: [],
    },
    {
      name: 'dateAcquired',
      label: 'Date Acquired',
      type: 'date',
      data: [],
    },
  ], []);

  const {
    employeeInfo: {
      info: { employeeId }
    }
  } = useSelector(state => state.employeeInformation);

  const dispatch = useDispatch();

  const {
    onSubmit,
    errors,
    register,
    handleSubmit,
    handleDelete,
    control
  } = useTrainingAndExpertise({
    dispatch,
    employeeId
  })

  const close = () => {
     setShouldUpdate(false)
  };
  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Training And Expertise ({index + 1})</Typography>
        {canDelete() && (<IconButton
          aria-label="delete"
          onClick={() => handleDelete(item.id)}>
          <Icon className='text-red-500'>delete</Icon>
        </IconButton>)}
      </div>
      <form onSubmit={handleSubmit(onSubmit(item.id, close))}>
        {/* <GridSystem> */}
          {
            inputs.map((input) => {
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
                        className="w-full my-20"
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
                  className='my-20'
                />
              )
            })
          }
        {/* </GridSystem> */}
        {shouldUpdate && (<SharedButton
          variant='contained'
          color='primary'
          className='w-1/2 flex flex-col mx-auto my-16'
          type='submit'
        >
          Update
        </SharedButton>)}
        <Divider className='my-16' />
      </form>
    </>
  );
};

export const AddTrainingAndExpertise = () => {
  const inputs = React.useMemo(() => [
    {
      name: 'training',
      label: 'Training',
      type: '',
      data: [],
    },
    {
      name: 'dateAcquired',
      label: 'Date Acquired',
      type: 'date',
      data: [],
    },
  ], []);

  const {
    employeeInfo: {
      info: { employeeId }
    }
  } = useSelector(state => state.employeeInformation);

  const dispatch = useDispatch();

  const {
    onSubmit,
    errors,
    register,
    handleSubmit,
    control
  } = useTrainingAndExpertise({
    dispatch,
    employeeId
  })

  return (
    <form onSubmit={handleSubmit(onSubmit())}>
      {inputs.map((input) => {
        if (input.type === 'date') {
          return (
            <Controller
              control={control}
              // defaultValue={input.defaultValue}
              name={input.name}
              as={
                <DatePicker
                  inputVariant="outlined"
                  inputRef={register}
                  label={input.label}
                  className="w-full my-20"
                  // value={input.defaultValue}
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
          <div className='my-20'>
            <Input
              {...input}
              error={errors[input.name]}
              message={errors[input.name]?.message}
              refs={register}
            />
          </div>

        )
      })}
      <SharedButton
        variant='contained'
        color='primary'
        className='flex mx-auto w-1/2'
        type='submit'
      >
        Add
      </SharedButton>
    </form>
  );
};
export default TrainingAndExpertise;