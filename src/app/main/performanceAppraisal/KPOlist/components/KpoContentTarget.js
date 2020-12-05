import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';

const KpoContentTarget = () => {
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form>
        <Input
          name='kpoYear'
          label='Q1'
          className='my-16'
          multiline
        />
        <Input
          className='my-16'
          name='Q2'
          label='Q2'
          multiline
        />
        <Input
          className='my-16'
          name='Q3'
          label='Q3'
          multiline
        />
        <Input
          className='my-16'
          name='Q2'
          label='Q4'
          multiline
        />
        <Input
          className='my-16'
          name='Q2'
          label='Year End'
          multiline
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

export default KpoContentTarget;