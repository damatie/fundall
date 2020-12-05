import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';

const EditEmployeeKpoContent = () => {
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form>
        <SelectTextField
          name='kpoCategory'
          label='Kpo Category'
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
          label='Description'
          className='my-16'
          multiline
        />
        <Input
          className='my-16'
          name='lineManager'
          label='Target'
        />
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Update KPO Content
        </SharedButton>
      </form>
    </Paper>
  );
};

export default EditEmployeeKpoContent;