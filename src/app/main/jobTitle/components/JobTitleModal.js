import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import useJobTitle from '../hooks/useJobTitle';

const JobTitleModal = () => {
  const { errors, register, onSubmit, handleSubmit, type, singleData, open, closeModal } = useJobTitle();
  return (
    <SharedModal
      open={open}
      title={type === 'new' ? 'Create Job Title' : 'Update Job Title'}
      handleClose={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='name'
          label='Name'
          className='my-16'
          defaultValue={type === 'update' ? singleData?.name : ''}
          error={errors.name}
          refs={register}
          message={errors.name?.message}
        />
        
        <Input
          className='my-16'
          name='description'
          label='Description'
          defaultValue={type === 'update' ? singleData?.description : ''}
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
          Create category
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default JobTitleModal;