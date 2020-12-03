import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';

const KpoContentPipScore = () => {
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form>
        <Input
          name='kpoYear'
          label='%PIP Score'
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