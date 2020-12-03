import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';

const EditEmployeeKpo = () => {
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form>
        <SelectTextField
          name='jobRole'
          label='Job Role'
          className='my-10'
        >
          <MenuItem value="Active">
            Office Admin
          </MenuItem>
          <MenuItem value="Inactive">
            Dev Ops
          </MenuItem>
        </SelectTextField>
        <Input
          name='kpoYear'
          label='KPO Year'
          type='date'
          className='my-16'
        />
        <Input
          className='my-16'
          name='lineManager'
          label='Line Manager'
        />
        <Input
          className='my-16'
          name='reviewingManager'
          label='Reviewing Manager'
        />
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Update KPO
        </SharedButton>
      </form>
    </Paper>
  );
};

export default EditEmployeeKpo;