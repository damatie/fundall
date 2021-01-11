import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import SharedButton from 'app/shared/button/SharedButton';

const PersonalDevelopment = () => {
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form>
        <div className="w-full">
        <Typography variant="subtitle1" color="initial">Personal Development Needs</Typography>
        <Input
          name='kpoYear'
          multiline
        />
        </div>
        <div className="w-full">
        <Typography variant="subtitle1" color="initial">Actions Required</Typography>
        <Input
          name='kpoYear'
          multiline
        />
        </div>
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

export default PersonalDevelopment;