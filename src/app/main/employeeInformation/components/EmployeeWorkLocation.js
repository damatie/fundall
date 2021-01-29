import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

const EmployeeWorkLocation = () => {
  const inputs = React.useMemo(() => [
    {
      name: '',
      type: 'text',
      label: 'Contact Address',
      defaultValue: '',
      data: []
    },
    {
      name: '',
      type: 'select',
      label: 'City',
      defaultValue: '',
      data: []
    },
    {
      name: '',
      type: 'select',
      label: 'State',
      defaultValue: '',
      data: []
    },
    {
      name: '',
      type: 'number',
      label: 'Postal / Zip Code',
      defaultValue: '',
      data: []
    },
    {
      name: '',
      type: 'select',
      label: 'Country',
      defaultValue: '',
      data: []
    }
  ], []);
  return (
    <BasicCard
      title='Office And Work Location'
    >
      <Grid container spacing={1}>
        {inputs.map((input) => {
          if (input.type === 'select') {
            return (
              <Grid item lg={12}>
                <div className='my-16'>
                  <SelectTextField
                    label={input.label}
                    name={input.name}
                  >
                    {input.data.map((value) => (
                      <MenuItem>{value}</MenuItem>
                    ))}
                  </SelectTextField>
                </div>

              </Grid>
            )
          }
          return (
            <Grid item lg={12}>
              <div className='my-16'>
                <Input {...input} />
              </div>

            </Grid>
          )
        })}
      </Grid>

    </BasicCard>
  );
};

export default EmployeeWorkLocation;