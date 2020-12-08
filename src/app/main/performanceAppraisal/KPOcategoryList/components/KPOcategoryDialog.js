import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import React from 'react';
import useKPOcategoryList from '../hooks/useKPOcategoryList';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';

const KPOcategoryDialog = () => {
  const { 
    open, 
    title, 
    handleClose, 
    type, 
    category, 
    errors, 
    handleSubmit, 
    onSubmit, 
    register,
    control
   } = useKPOcategoryList();
  return (
    <SharedModal
      open={open}
      title={title}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='name'
          label='Name'
          className='my-16'
          defaultValue={type === 'update' ? category.name : ''}
          error={errors.name}
          refs={register}
          message={errors.name?.message}
        />
        <Controller
          name='status'
          control={control}
          defaultValue={type === 'update' ? category.status : ''}
          as={
          <SelectTextField
            name='status'
            label='Status'
            error={errors.status}
            message={errors.status?.message}
          >
            <MenuItem value="Active">
              Active
            </MenuItem>
            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </SelectTextField>
          }
        />
        
        <Input
          className='my-16'
          name='description'
          label='Description'
          defaultValue={type === 'update' ? category.description : ''}
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
          {type === 'new' ?  'Create category' : 'Update category'}
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default KPOcategoryDialog;