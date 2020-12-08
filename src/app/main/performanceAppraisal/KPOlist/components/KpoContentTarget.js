import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';
import useKpoContentList from '../hooks/useKpoContent';

const KpoContentTarget = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register
  } = useKpoContentList({type: 'quarter'});
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='q1'
          label='Q1'
          className='my-16'
          multiline
          error={errors.q1}
          message={errors.q1?.message}
          refs={register}
        />
        <Input
          className='my-16'
          name='q2'
          label='Q2'
          multiline
          error={errors.q2}
          message={errors.q2?.message}
          refs={register}
        />
        <Input
          className='my-16'
          name='q3'
          label='Q3'
          multiline
          error={errors.q3}
          message={errors.q3?.message}
          refs={register}
        />
        <Input
          className='my-16'
          name='q4'
          label='Q4'
          multiline
          error={errors.q4}
          message={errors.q4?.message}
          refs={register}
        />
        <Input
          className='my-16'
          name='yearEnd'
          label='Year End'
          multiline
          error={errors.yearEnd}
          message={errors.yearEnd?.message}
          refs={register}
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