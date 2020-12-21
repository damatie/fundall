import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';

const KpoContentPipScore = () => {
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form>
        <Input
          name='kpoYear'
          label='%PIP Achieved'
          className='my-16'
        />
        <SelectTextField
          name='kpoCategoryId'
          label='PIP Compansation Type'
          className='my-10'
        >
          <MenuItem value={1}>
            Employee Basic Salary
          </MenuItem>
          <MenuItem value={2}>
            Employee Gross Salary Amount
          </MenuItem>
        </SelectTextField>
        <Input
          name='kpoYear'
          label='%PIP Awarded'
          className='my-16'
        />
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Save
        </SharedButton>
      </form>
    </Paper>
  );
};

export default KpoContentPipScore;