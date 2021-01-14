import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import Paper from '@material-ui/core/Paper';

const UpdateBehaviouralAttribute = ({customHook}) => {
  const {
    textFieldValue,
    errors,
    register,
    handleSubmit,
    onSubmit
  } = customHook
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='title'
          label='Title'
          className='my-16'
          defaultValue={textFieldValue('title')}
          error={errors.title}
          refs={register}
          message={errors.title?.message}
        />
        
        <Input
          className='my-16'
          name='description'
          label='Description'
          defaultValue={textFieldValue('description')}
          multiline
          error={errors.description}
          refs={register}
          message={errors.description?.message}
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