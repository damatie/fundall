import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider'

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
const EmployeeVacation = () => {
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
  return (
    <BasicCard
      title='Travel And Vacation Schedule'
    >
      <form>
        {data.map((item) => (
          <>
            <GridSystem>
              {
                inputs.map((input) => {
                  if (input.type === 'select') {
                    return (
                      <SelectTextField
                        name={input.name}
                        label={input.label}
                        defaultValue={item[input.name]}
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
                    />
                  )
                })
              }
            </GridSystem>
            <Divider className='my-16' />
          </>
        ))}
      </form>
    </BasicCard>
  );
};

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