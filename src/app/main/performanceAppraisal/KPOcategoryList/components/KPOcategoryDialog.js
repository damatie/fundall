import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import React from 'react';
import useKPOcategoryList from '../hooks/useKPOcategoryList';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';

const KPOcategoryDialog = () => {
  const { open, title, handleClose, type, category } = useKPOcategoryList();
  return (
    <SharedModal
      open={open}
      title={title}
      handleClose={handleClose}
    >
      <form>
        <Input
          name='name'
          label='Name'
          className='my-16'
          defaultValue={type === 'update' ? category.name : ''}
        />
        <SelectTextField
          name='status'
          label='Status'
          className='my-10'
          defaultValue={type === 'update' ? category.status : ''}
        >
          <MenuItem value="Active">
            Active
          </MenuItem>
          <MenuItem value="Inactive">
            Inactive
          </MenuItem>
        </SelectTextField>
        <Input
          className='my-16'
          name='description'
          label='Description'
          defaultValue={type === 'update' ? category.description : ''}
          multiline
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