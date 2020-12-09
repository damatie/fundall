import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import useKpoContentList from '../hooks/useKpoContent';
import { Controller } from 'react-hook-form';

const EditEmployeeKpoContent = () => {
  const {
    register, errors, handleSubmit, onSubmit, control, kpoDetails
  } = useKpoContentList();
  return (
    <Paper variant="outlined" className='w-1/2 flex flex-col mx-auto p-20'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
          control={control}
          name='kpoCategoryId'
          defaultValue={kpoDetails.kpoCategory}
          as={
            <SelectTextField
              name='kpoCategoryId'
              label='KPO Category'
              className='my-10'
              error={errors.kpoCategoryId}
              message={errors.kpoCategoryId?.message}
            >
              <MenuItem value="Admin">
                Office Admin
              </MenuItem>
              <MenuItem value="Inactive">
                Dev Ops
              </MenuItem>
            </SelectTextField>
          }
        />
        
        <Input
          name='kpoDescription'
          label='Description'
          className='my-16'
          multiline
          error={errors.kpoDescription}
          message={errors.kpoDescription?.message}
          refs={register}
          defaultValue={kpoDetails.description}
        />
        <Input
          className='my-16'
          name='target'
          label='Target'
          error={errors.target}
          message={errors.target?.message}
          refs={register}
          defaultValue={kpoDetails.target}
        />
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Update KPO Content
        </SharedButton>
      </form>
    </Paper>
  );
};

export default EditEmployeeKpoContent;