import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import useKpoList from '../hooks/useKpoList';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import AutoCompleteInput from 'app/shared/TextInput/AutoComplete';
import Input from 'app/shared/TextInput/Input';

const CreateEmployeeKpo = ({customHook}) => {
  const { handleCloseModal, open, register, errors, handleSubmit, onSubmit, control, jobTitles } = customHook;
  return (
    <SharedModal
      title='Create KPO'
      open={open}
      handleClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          as={
            <SelectTextField
              name='jobTitleId'
              label='Job Title'
              className='my-10'
              error={errors.jobTitleId}
              message={errors.jobTitleId?.message}
            >
              {
                jobTitles.map(({name, id}) => (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                ))
              }
            </SelectTextField>
          }
          name='jobTitleId'
        />

          {/* <Input
            name='pipTarget'
            className='my-16'
            label='PIP Target'
            multiline
          /> */}

        <AutoCompleteInput
          className='my-16'
          name='lineManagerId'
          label='Line Manager'
          data={[{name: 'Josh Maximum', id: 1}]}
          error={errors.lineManagerId}
          helperText={errors.lineManagerId?.message}
          onChange={(ev, value) => register({name: 'lineManagerId', value: value?.id})}
        />

        <AutoCompleteInput
          className='my-16'
          name='reviewingManagerId'
          label='Reviewing Manager'
          data={[{name: 'David chinweike', id: 2}]}
          error={errors.reviewingManagerId}
          helperText={errors.reviewingManagerId?.message}
          onChange={(ev, value) => register({name: 'reviewingManagerId', value: value?.id})}
        />
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          Create KPO
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default CreateEmployeeKpo;