import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';

const JobTitleModal = () => {
  return (
    <SharedModal
      open={true}
      title={'Create Job Title'}
      handleClose={() => console.log('hello')}
    >
      <form>
        <Input
          name='name'
          label='Name'
          className='my-16'
          // defaultValue={type === 'update' ? category.name : ''}
          // error={errors.name}
          // refs={register}
          // message={errors.name?.message}
        />
        
        <Input
          className='my-16'
          name='description'
          label='Description'
          // defaultValue={type === 'update' ? category.description : ''}
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
          Create category
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default JobTitleModal;