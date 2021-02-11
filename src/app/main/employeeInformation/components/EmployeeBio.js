import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';

const EmployeeBio = () => {
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
      label: 'Residential Address',
      defaultValue: '',
    },
    {
      name: '',
      label: 'City Of Residence',
      defaultValue: '',
      type: 'select',
      data: ['Male', 'Female', 'Others']
    },
    {
      name: '',
      label: 'County',
      defaultValue: '',
      type: 'select',
      data: ['Single', 'Married', 'Divorced', 'Complicated']
    },
    {
      name: '',
      label: 'Nearest Airport to Residence',
      defaultValue: '',
    },
    {
      name: '',
      label: 'County',
      defaultValue: '',
      type: 'select',
      data: ['Single', 'Married', 'Divorced', 'Complicated']
    },
    
    {
      name: '',
      label: 'Employee Nationality',
      defaultValue: '',
      type: 'select',
      data: ['Single', 'Married', 'Divorced', 'Complicated']
    },
    
  ] , []);

  return (
    <BasicCard
      title='Employee Bio Data'
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

export default EmployeeBio;