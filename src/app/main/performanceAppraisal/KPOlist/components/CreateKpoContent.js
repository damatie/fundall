import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import useKpoContentList from '../hooks/useKpoContent';
import { Controller } from 'react-hook-form';

const CreateKpoContent = ({customHook}) => {
  const { open, handleCloseModal, register, errors, handleSubmit, onSubmit, control, kpoCategory, pipEligibility } = customHook;
  return (
    <SharedModal
      title='Add KPO Content'
      open={open}
      handleClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit())}>
        <Controller
          control={control}
          name='kpoCategoryId'
          as={
            <SelectTextField
              label='KPO Category'
              className='my-10'
              error={errors.kpoCategoryId}
              message={errors.kpoCategoryId?.message}
            >
              {kpoCategory.map(item => {
                if(item.status.toUpperCase() === 'ACTIVE') {
                  return (
                    <MenuItem value={item.id}>
                      {item.name}
                    </MenuItem>
                  )
                }
              })}
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
        />
        <Input
          className='my-16'
          name='target'
          label='Target'
          error={errors.target}
          message={errors.target?.message}
          refs={register}
          type='number'
        />
        {pipEligibility && (
          <Input
            className='my-16'
            name='kpoPipTarget'
            label='PIP Target'
            error={errors.kpoPipTarget}
            message={errors.kpoPipTarget?.message}
            refs={register}
            type='number'
          />
        )}
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Create
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default CreateKpoContent;