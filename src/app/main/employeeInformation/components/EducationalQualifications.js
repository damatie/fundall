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

const data = [
  {
    institute: 'Recruitment Workshop',
    endDate: '12-04-2019',
    startDate: '12-07-2019',
    department: 'Lagos',
    qualification: 'BSC',
    grade: 'Upper balable',
  },
  {
    institute: 'Recruitment Workshop',
    endDate: '12-04-2019',
    startDate: '12-07-2019',
    department: 'Lagos',
    qualification: 'BSC',
    grade: 'Upper balable',
  },
]
const EducationalQualification = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
  return (
    <BasicCard
      title='Educational Qualification'
      button={
        <>
          <SharedButton
            variant='outlined'
            color='secondary'
            onClick={handleOpen('Educational Qualification')}
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
        <EducationalQualificationDetails
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

const EducationalQualificationDetails = ({ item, index, setShouldUpdate, shouldUpdate }) => {
  const inputs = React.useMemo(() => [
    {
      name: 'institute',
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
  ], []);
  const handleUpdate = () => {
    setShouldUpdate(false);
  }
  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Educational Qualification ({index + 1})</Typography>
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
      </form>

      <Divider className='my-16' />
    </>
  )
}

export const AddEducationalQualification = () => {
  const inputs = React.useMemo(() => [
    {
      name: 'institute',
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
export default EducationalQualification;