import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import { useSelector } from 'react-redux';

const BehaviouralAttributeModal = () => {

  return (
    <SharedModal
      open={false}
      // title={modalTitle()}
      handleClose={() => null}
    >
      <form /*onSubmit={handleSubmit(onSubmit)}*/>
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
          {/* {buttonTitle()} */} hello
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default BehaviouralAttributeModal;