import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SharedButton from 'app/shared/button/SharedButton';

const CompensationColumnsInput = ({
  form: {
    register,
    errors,
    handleSubmit,
    onSubmit,
  },
  details,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='m-16'
    >
      <Input
        name='columnName'
        label='Column Name'
        ref={register}
        message={errors.columnName?.message}
        error={errors.columnName}
        defaultValue={details?.columnName}
      />
      <SharedButton
        variant='contained'
        color='primary'
        type='submit'
        className='my-16 w-1/2 flex mx-auto'
      >
        {!!details ? 'Update' : 'Save'}
      </SharedButton>
    </form>
  );
};

export default CompensationColumnsInput;