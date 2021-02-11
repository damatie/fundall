import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { DatePicker } from '@material-ui/pickers';
import useTravelAndVacation from '../hooks/useTravelAndVacation';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { getTravelAndVacation } from '../store/actions';
// const data = [
//   {
//     activity: 'Recruitment Workshop',
//     endDate: '12-04-2019',
//     startDate: '12-07-2019',
//     location: 'Lagos',
//     id: 1
//   },
//   {
//     activity: 'Vacation',
//     endDate: '12-07-2019',
//     startDate: '12/2/2020',
//     location: 'Monaco',
//     id: 2
//   }
// ]
const EmployeeVacation = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
  const { data } = useSelector(state => state.employeeInformation.travel);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTravelAndVacation());
  }, []);
  return (
    <BasicCard
      title='Travel And Vacation Schedule'
      button={
        <>
          <SharedButton
            variant='outlined'
            color='secondary'
            onClick={handleOpen('Travel And Vacation Schedule')}
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
        <EmployeeVacationDetails
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

const EmployeeVacationDetails = ({ item, index, setShouldUpdate, shouldUpdate }) => {

  const inputs = React.useMemo(() => [
    {
      name: 'activity',
      label: 'Activity',
      type: '',
      data: [],
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      data: [],
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      data: [],
    },
    {
      name: 'location',
      label: 'Location',
    }
  ], []);

  const dispatch = useDispatch();

  const {
    onSubmit,
    errors,
    register,
    handleSubmit,
    handleDelete,
    control
  } = useTravelAndVacation({
    dispatch
  })

  const close = () => {
     setShouldUpdate(false)
  };

  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Travel And Vacation Schedule ({index + 1})</Typography>
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
              // if (input.type === 'select') {
              //   return (
              //     <SelectTextField
              //       name={input.name}
              //       label={input.label}
              //       defaultValue={item[input.name]}
              //       disabled={!shouldUpdate}
              //     >
              //       {input.data.map((value) => (
              //         <MenuItem key={value} value={value}>
              //           {value}
              //         </MenuItem>
              //       ))}
              //     </SelectTextField>
              //   )
              // }
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
        <Divider className='my-16' />
      </form>
    </>
  )
}

export const AddEmployeeVacation = () => {
  const dispatch = useDispatch();

  const inputs = React.useMemo(() => [
    {
      name: 'activity',
      label: 'Activity',
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      data: [],
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      data: [],
    },
    {
      name: 'location',
      label: 'Location',
      // type: 'select',
      // data: [],
    }
  ], []);

  const {
    onSubmit,
    errors,
    register,
    handleSubmit,
    control
  } = useTravelAndVacation({
    dispatch
  })

  return (
    <form onSubmit={handleSubmit(onSubmit())}>
      {inputs.map((input) => {
        // if (input.type === 'select') {
        //   return (
        //     <div className='my-20'>
        //       <SelectTextField
        //         name={input.name}
        //         label={input.label}
        //       >
        //         {input.data.map((value) => (
        //           <MenuItem key={value} value={value}>
        //             {value}
        //           </MenuItem>
        //         ))}
        //       </SelectTextField>
        //     </div>

        //   )
        // }
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
export default EmployeeVacation;