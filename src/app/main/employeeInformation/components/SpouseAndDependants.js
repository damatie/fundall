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
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const data = [
  {
    firstName: 'Recruitment Workshop',
    lastName: '12-04-2019',
    relationship: 'sister'
  },
  {
    firstName: 'Recruitment Workshop',
    lastName: '12-04-2019',
    relationship: 'sister'
  },
]
const SpouseAndDependants = ({ handleOpen }) => {
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
  return (
    <BasicCard
      title='Spouse / Dependants'
      button={
        <>
          <SharedButton
            variant='outlined'
            color='secondary'
            onClick={handleOpen('Spouse / Dependants')}
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
        <SpouseAndDependantsDetails
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

const SpouseAndDependantsDetails = ({ item, index, setShouldUpdate, shouldUpdate }) => {
  const inputs = React.useMemo(() => [
    {
      name: 'firstName',
      label: 'First Name',
      type: '',
      data: [],
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: '',
      data: [],
    },
    {
      name: 'relationship',
      label: 'Relationship',
      type: 'select',
      data: [],
    },
  ], []);
  const handleUpdate = () => {
    setShouldUpdate(false);
  }
  return (
    <>
      <div className='flex flex-row items-center my-20'>
        <Typography variant="subtitle1" color="initial">Spouse / Dependants ({index + 1})</Typography>
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

export const AddSpouseAndDependant = () => {
  const inputs = React.useMemo(() => [
    {
      name: 'firstName',
      label: 'First Name',
      type: '',
      data: [],
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: '',
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
        if (input.type === 'phoneNumber') {
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
export default SpouseAndDependants;