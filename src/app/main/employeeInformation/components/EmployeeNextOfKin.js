import React from 'react';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import BasicCard from './BasicCard';
import SharedButton from 'app/shared/button/SharedButton';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import 'react-phone-input-2/lib/material.css';

const data = [
  {
    name: 'Recruitment Workshop',
    address: '12-04-2019',
    contactNumber: 'sister',
    email: 'Recruitment Workshop',
    nationality: '12-04-2019',
    gender: 'sister',
    relationship: 'sister'
  },
  {
    name: 'Recruitment Workshop',
    address: '12-04-2019',
    contactNumber: 'sister',
    email: 'Recruitment Workshop',
    nationality: '12-04-2019',
    gender: 'sister',
    relationship: 'sister'
  },
]
const EmployeeNextOfKin = () => {
  const inputs = React.useMemo(() => [
    {
      name: 'name',
      label: 'Full Name',
      type: '',
      data: [],
    },
    {
      name: 'address',
      label: 'Address',
      type: '',
      data: [],
    },
    {
      name: 'contactNumber',
      label: 'Contact Number',
      type: 'phoneNumber',
      data: [],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      data: [],
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      data: [],
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      data: [],
    },
    {
      name: 'relationship',
      label: 'Relationship',
      type: 'select',
      data: [],
    },
  ], []);
  return (
    <BasicCard
      title='Employee Next of Kin'
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
                  if(input.type === 'phoneNumber') {
                    return (
                      // <Grid item lg={12}>
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
                      // </Grid>
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

export const AddEmployeeNextOfKin = () => {
  const inputs = React.useMemo(() => [
    {
      name: 'name',
      label: 'Full Name',
      type: '',
      data: [],
    },
    {
      name: 'address',
      label: 'Address',
      type: '',
      data: [],
    },
    {
      name: 'contactNumber',
      label: 'Contact Number',
      type: 'phoneNumber',
      data: [],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      data: [],
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      data: [],
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      data: [],
    },
    {
      name: 'relationship',
      label: 'Relationship',
      type: 'select',
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
        if(input.type === 'phoneNumber') {
          return (
            // <Grid item lg={12}>
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
            // </Grid>
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
export default EmployeeNextOfKin;