import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import useEmployeeGrade from '../hooks/useEmployeeGrade';

const EmployeeGradeModal = () => {
  const state = useSelector(state => state.employeeGrade);
  const { textFieldValue, onSubmit, handleSubmit, errors, register, control, handleClose, buttonTitle, modalTitle } = useEmployeeGrade(state);
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
          refs={register}
          message={errors.name?.message}
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
        <Controller
          name='pip'
          control={control}
          defaultValue={textFieldValue('pip')}
         as={
           <SelectTextField
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
        >
          {buttonTitle()}
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default EmployeeGradeModal;