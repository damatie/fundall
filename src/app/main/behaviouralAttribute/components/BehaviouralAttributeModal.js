import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';

const BehaviouralAttributeModal = ({customHook, state}) => {
  const { 
    modalTitle,
    handleSubmit, 
    onSubmit, 
    handleClose, 
    textFieldValue, 
    buttonTitle,
    errors,
    register
  } = customHook;
  return (
    <SharedModal
      open={state.open}
      title={modalTitle()}
      handleClose={handleClose}
    >
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
          {buttonTitle()}
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default BehaviouralAttributeModal;