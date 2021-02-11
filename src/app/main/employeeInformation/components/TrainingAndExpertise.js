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

const TrainingAndExpertise = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const { data } = useSelector(state => state.employeeInformation.training);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTrainingAndExpertise());
  }, []);

  return (
    <BasicCard
      title='Training And Expertise'
      button={
        <>
          <SharedButton
            variant='outlined'
            color='secondary'
            onClick={handleOpen('Training And Expertise')}
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
        <TrainingAndExpertiseDetails
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

const TrainingAndExpertiseDetails = ({ item, index, setShouldUpdate, shouldUpdate }) => {
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

  const dispatch = useDispatch();

  const {
    onSubmit,
    errors,
    register,
    handleSubmit,
    handleDelete,
    control
  } = useTrainingAndExpertise({
    dispatch
  })

  const close = () => {
     setShouldUpdate(false)
  };
  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Training And Expertise ({index + 1})</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(item.id)}>
          <Icon className='text-red-500'>delete</Icon>
        </IconButton>
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

  const dispatch = useDispatch();

  const {
    onSubmit,
    errors,
    register,
    handleSubmit,
    control
  } = useTrainingAndExpertise({
    dispatch
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