import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

const EmployeeOrganization = () => {
  const inputs = React.useMemo(() => [
    {
      name: '',
      label: 'Employee SRG Entity',
      type: 'select',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'Department/Function',
      type: 'select',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'Job TItle',
      type: 'select',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'Employee\'s Manager 1',
      type: '',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'Employee\'s Functional Manager',
      type: '',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'Personal Assistant/Secretary',
      type: '',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'Industry Seniority',
      type: 'select',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'SRG Seniority',
      type: '',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'Employee Start Date',
      type: '',
      data: [],
      defaultValue: '',
    },
    {
      name: '',
      label: 'Employment Status',
      type: 'select',
      data: [],
      defaultValue: '',
    }
  ], []);
  return (
    <BasicCard
      title='Organization'
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

export default EmployeeOrganization;