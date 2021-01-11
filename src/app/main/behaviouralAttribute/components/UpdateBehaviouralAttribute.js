import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import Paper from '@material-ui/core/Paper';

const UpdateBehaviouralAttribute = () => {
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form>
        <Input
          name='name'
          label='Name'
          className='my-16'
          // defaultValue={textFieldValue('name')}
          // error={errors.name}
          // refs={register}
          // message={errors.name?.message}
        />
        
        <Input
          className='my-16'
          name='description'
          label='Description'
          // defaultValue={textFieldValue('description')}
          multiline
          // error={errors.description}
          // refs={register}
          // message={errors.description?.message}
        />
        
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Update
        </SharedButton>
      </form>
    </Paper>
  );
};

export default UpdateBehaviouralAttribute;