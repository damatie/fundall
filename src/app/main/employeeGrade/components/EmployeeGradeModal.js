import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';

const EmployeeGradeModal = ({ customHook }) => {

  const { textFieldValue, onSubmit, handleSubmit, errors, register, control, handleClose, buttonTitle, modalTitle, state } = customHook;

  return (
    <SharedModal
      open={state.open}
      title={modalTitle()}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='name'
          label='Name'
          className='my-16'
          defaultValue={textFieldValue('name')}
          error={errors.name}
          ref={register}
          message={errors.name?.message}
        />
        
        <Input
          className='my-16'
          name='description'
          label='Description'
          defaultValue={textFieldValue('description')}
          multiline
          error={errors.description}
          ref={register}
          message={errors.description?.message}
        />
        <Controller
          name='pip'
          control={control}
          defaultValue={textFieldValue('pip')}
          label='PIP Eligible'
         as={
           <SelectTextField
           data-testid='pip'
            name='pip'
            label='PIP Eligible'
            defaultValue={textFieldValue('pip')}
            error={errors.pip}
            message={errors.pip?.message}
           >
             <MenuItem value={true}>
               Yes
             </MenuItem>
             <MenuItem value={false}>
              No
             </MenuItem>
           </SelectTextField>
         }
        />
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
          data-testid='button'
        >
          {buttonTitle()}
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default EmployeeGradeModal;