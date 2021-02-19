import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';

const EmployeeGradeModal = ({ customHook }) => {

  const { entity, textFieldValue, onSubmit, handleSubmit, errors, register, control, handleClose, buttonTitle, modalTitle, state } = customHook;

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
          defaultValue={textFieldValue('gradeName')}
          error={errors.name}
          ref={register}
          message={errors.name?.message}
        />
        <Controller
          name='entity'
          control={control}
          defaultValue={textFieldValue('entityName')}
          label='Entity'
         as={
           <SelectTextField
           data-testid='entity'
            name='entity'
            label='Entity'
            defaultValue={textFieldValue('entityName')}
            error={errors.entity}
            message={errors.entity?.message}
           >
             {
               entity.map((item) => (
                <MenuItem value={item}>
                  {item.entityName}
                </MenuItem>
               ))
             }
           </SelectTextField>
         }
        />
        
        <Input
          className='my-16'
          name='description'
          label='Description'
          defaultValue={textFieldValue('gradeDescription')}
          multiline
          error={errors.description}
          ref={register}
          message={errors.description?.message}
        />
        <Controller
          name='pip'
          control={control}
          defaultValue={textFieldValue('pipEligibility')}
          label='PIP Eligible'
         as={
           <SelectTextField
           data-testid='pip'
            name='pip'
            label='PIP Eligible'
            defaultValue={textFieldValue('pipEligibility')}
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