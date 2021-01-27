import React from 'react';
import SharedModal from 'app/shared/modal/SharedModal';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import Input from 'app/shared/TextInput/Input';
import GridSystem from 'app/shared/gridSystem';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import Typography from '@material-ui/core/Typography'

const AddNewEmployee = () => {
  return (
    <SharedModal
      open={true}
      handleClose={() => null}
      title='Create An Account'
    >
      <form className='my-16'>
        <GridSystem>
          <Input
            name='firstName'
            label='First Name'
          />
          <Input
            name='middleName'
            label='Middle Name'
          />
          <Input
            name='lastName'
            label='Last Name'
          />
          <Input
            name='email'
            label='Official Email'
            type='email'
          />
          <SelectTextField
            name='entity'
            label='Entity'
          >
            <MenuItem>
              Entity
            </MenuItem>
          </SelectTextField>
          <SelectTextField
            name='department'
            label='Department'
          >
            <MenuItem>
              department
            </MenuItem>
          </SelectTextField>
          <Input
            name='employeeIdNumber'
            label='Employee ID Number'
            type='number'
          />
          <SelectTextField
            name='employeeGrade'
            label='Employee Grade'
          >
            <MenuItem>
              employeeGrade
            </MenuItem>
          </SelectTextField>
          <div>
            <Typography variant="subtitle1" color="initial">SRG Seniority Date</Typography>
            <Input
            name='srgSeniorityDate'
            type='date'
          />
          </div>
        </GridSystem>
        <SharedButton
          color='secondary'
          variant='contained'
          className='flex flex-col items-center justify-center mx-auto my-16'
        >
          Submit
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default AddNewEmployee;