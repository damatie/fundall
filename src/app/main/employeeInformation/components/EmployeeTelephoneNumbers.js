import React from 'react';
import Input from 'app/shared/TextInput/Input';
import Grid from '@material-ui/core/Grid'
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import 'react-phone-input-2/lib/material.css';

const EmployeeTelephoneNumbers = () => {
  const inputs = React.useMemo(() => [
    {
      name: '',
      label: 'Official Mobile No',
      defaultValue: '',
      type: 'phoneNumber',
    },
    {
      name: '',
      label: 'Office Telephone Line',
      defaultValue: '',
      type: 'number',
    },
    {
      name: '',
      label: 'Office Extension',
      defaultValue: '',
      type: 'number',
    },
    {
      name: '',
      label: 'Private Mobile Number',
      defaultValue: '',
      type: 'phoneNumber',
    }
  ], []);
  return (
    <BasicCard
      title='Telephone Number'
    >
      <Grid container spacing={1}>
      {
        inputs.map((input) => {
          if(input.type === 'phoneNumber') {
            return (
              <Grid item lg={12}>
                <div className='my-16'>
                  <PhoneInput
                    id="pNum"
                    country='ng'
                    // placeholder="Enter phone number"
                    containerClass='w-full'
                    inputClass='w-full'
                    specialLabel={input.label}
                    enableAreaCodes
                    enableSearch
                    // className={classes.phoneInput}
                    // inputRef={register}
                    // isValid={(inputNumber, onlyCountries) => {
                    //   return onlyCountries.some((country) => {
                    //     return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                    //   });
                    // }}
                  />
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
        })
      }
      </Grid>
    </BasicCard> 
  );
};

export default EmployeeTelephoneNumbers;