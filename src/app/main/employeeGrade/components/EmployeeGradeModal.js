import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import React from 'react';
import SharedButton from 'app/shared/button/SharedButton';
import { Controller } from 'react-hook-form';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';

const EmployeeGradeModal = () => {
  return (
    <SharedModal
      open={true}
      title={true ? 'Create Employee Grade' : 'Update Employee Grade'}
      handleClose={() => null}
    >
      <form /*onSubmit={handleSubmit(onSubmit)}*/>
        <Input
          name='name'
          label='Name'
          className='my-16'
          // defaultValue={type === 'update' ? singleData?.name : ''}
          // error={errors.name}
          // refs={register}
          // message={errors.name?.message}
        />
        
        <Input
          className='my-16'
          name='description'
          label='Description'
          // defaultValue={type === 'update' ? singleData?.description : ''}
          // multiline
          // error={errors.description}
          // refs={register}
          // message={errors.description?.message}
        />
        {/* <Controller
          name='pip'
         as={ */}
           <SelectTextField
            label='PIP Eligible'
           >
             <MenuItem value={true}>
               Yes
             </MenuItem>
             <MenuItem value={false}>
              No
             </MenuItem>
           </SelectTextField>
         {/* }
        /> */}
        <SharedButton
          variant='contained'
          color='primary'
          type='submit'
          className='flex mx-auto'
        >
          {true ? 'Create Employee Grade' : 'Update Employee Grade'}
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default EmployeeGradeModal;