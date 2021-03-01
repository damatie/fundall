import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { DatePicker } from '@material-ui/pickers';
import useEducation from '../hooks/useEducation';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { getEducation } from '../store/actions';
import { useParams } from 'react-router';
import userPermission from '../logic/userPermission';

const EducationalQualification = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const params = useParams();
  const authState = useSelector(state => state.auth.user);
  const getUserId = !!params?.id ? params?.id : authState.id;

  const {
    education: { data },
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
    dispatch(getEducation(getUserId));
  }, []);

  return (
    <BasicCard
      title='Educational Qualification'
      button={
        <>
          <>
            {
              canAdd() && (<SharedButton
                variant='outlined'
                color='secondary'
                onClick={handleOpen('Educational Qualification')}
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
      {
        data.map((item, index) => (
          <EducationalQualificationDetails
            item={item}
            key={item?.id}
            index={index}
            shouldUpdate={shouldUpdate}
            setShouldUpdate={setShouldUpdate}
            canDelete={canDelete}
          />
        ))
      }
    </BasicCard>
  );
};

const EducationalQualificationDetails = ({ item, index, setShouldUpdate, shouldUpdate, canDelete }) => {
  const inputs = React.useMemo(() => [
    {
      name: 'school',
      label: 'Institute/School',
      type: '',
      data: [],
    },
    {
      name: 'department',
      label: 'Major/Department',
      type: '',
      data: [],
    },
    {
      name: 'grade',
      label: 'Grade',
      type: '',
      data: [],
    },
    {
      name: 'qualification',
      label: 'Qualification',
      type: '',
      data: [],
    },
    {
      name: 'startYear',
      label: 'Start Year',
      type: 'date',
      data: [],
    },
    {
      name: 'endYear',
      label: 'End Year',
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
  } = useEducation({
    dispatch,
    employeeId
  })
  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Educational Qualification ({index + 1})</Typography>
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
                        views={["year"]}
                        // maxDate={dob}
                        // format={'MMMM Do, YYYY'}
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

export const AddEducationalQualification = () => {
  const inputs = React.useMemo(() => [
    {
      name: 'school',
      label: 'Institute/School',
      type: '',
      data: [],
    },
    {
      name: 'department',
      label: 'Major/Department',
      type: '',
      data: [],
    },
    {
      name: 'grade',
      label: 'Grade',
      type: '',
      data: [],
    },
    {
      name: 'qualification',
      label: 'Qualification',
      type: '',
      data: [],
    },
    {
      name: 'startYear',
      label: 'Start Year',
      type: 'date',
      data: [],
    },
    {
      name: 'endYear',
      label: 'End Year',
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
  } = useEducation({
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
                      views={["year"]}
                      className="w-full"
                      // value={item[input.name]}
                      // maxDate={dob}
                      // format={'MMMM Do, YYYY'}
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
export default EducationalQualification;