import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';

const EmployeeProfile = () => {
  const inputs = React.useMemo(() => 
    [
      {
        name: '',
        label: 'Title',
        defaultValue: '',
      },
      {
        name: '',
        label: 'First Name',
        defaultValue: '',
      },
      {
        name: '',
        label: 'Middle Name',
        defaultValue: '',
      },
      {
        name: '',
        label: 'Surname',
        defaultValue: '',
      },
      {
        name: '',
        label: 'SRGN',
        defaultValue: '',
      },
      {
        name: '',
        label: 'Gender',
        defaultValue: '',
        type: 'select',
        data: ['Male', 'Female', 'Others']
      },
      {
        name: '',
        label: 'Marital Status',
        defaultValue: '',
        type: 'select',
        data: ['Single', 'Married', 'Divorced', 'Complicated']
      },
      {
        name: '',
        label: 'Nickname',
        defaultValue: '',
      }
    ] , []);

  return (
    <BasicCard
      title='Employee Profile Information'
    >
      <GridSystem>
        {inputs.map((input) => {
          if(input.type === 'select') {
            return (
              <SelectTextField
                name={input.name}
                label={input.label}
              >
                {input.data.map((value) =>(
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
            />
          )
        })}
      </GridSystem>
    </BasicCard>
  );
};

export default EmployeeProfile;