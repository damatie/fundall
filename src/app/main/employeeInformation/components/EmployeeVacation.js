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

const data = [
  {
    activity: 'Recruitment Workshop',
    endDate: '12-04-2019',
    startDate: '12-07-2019',
    location: 'Lagos'
  },
  {
    activity: 'Vacation',
    endDate: '12-07-2019',
    startDate: '12/2/2020',
    location: 'Monaco'
  }
]
const EmployeeVacation = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
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
      type: 'select',
      data: ['Lagos', 'Monaco'],
    }
  ], []);

  const handleUpdate = () => {
    setShouldUpdate(false);
  }
  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Travel And Vacation Schedule ({index + 1})</Typography>
        <IconButton
          aria-label="delete"
          onClick={() => null}>
          <Icon className='text-red-500'>delete</Icon>
        </IconButton>
      </div>
      <form>
        <GridSystem>
          {
            inputs.map((input) => {
              if (input.type === 'select') {
                return (
                  <SelectTextField
                    name={input.name}
                    label={input.label}
                    defaultValue={item[input.name]}
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
                  defaultValue={item[input.name]}
                  disabled={!shouldUpdate}
                />
              )
            })
          }
        </GridSystem>
        {shouldUpdate && (<SharedButton
          variant='contained'
          color='primary'
          className='w-1/2 flex flex-col mx-auto my-16'
          onClick={handleUpdate}
        >
          Update
        </SharedButton>)}
        <Divider className='my-16' />
      </form>
    </>
  )
}

export const AddEmployeeVacation = () => {
  const inputs = React.useMemo(() => [
    {
      name: '',
      label: 'Activity',
      type: '',
      data: [],
    },
    {
      name: '',
      label: 'Start Date',
      type: 'date',
      data: [],
    },
    {
      name: '',
      label: 'End Date',
      type: 'date',
      data: [],
    },
    {
      name: '',
      label: 'Location',
      type: 'select',
      data: [],
    }
  ], []);

  return (
    <form>
      {inputs.map((input) => {
        if (input.type === 'select') {
          return (
            <div className='my-20'>
              <SelectTextField
                name={input.name}
                label={input.label}
              >
                {input.data.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </SelectTextField>
            </div>

          )
        }
        return (
          <div className='my-20'>
            <Input
              {...input}
            />
          </div>

        )
      })}
      <SharedButton
        variant='contained'
        color='secondary'
        className='flex mx-auto'
      >
        Add
      </SharedButton>
    </form>
  );
};
export default EmployeeVacation;