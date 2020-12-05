import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import useKpoContentList from '../hooks/useKpoContent';

const CreateKpoContent = () => {
  const { open, handleCloseModal } = useKpoContentList();
  return (
    <SharedModal
      title='Add KPO Content'
      open={open}
      handleClose={handleCloseModal}
    >
      <form>
        <SelectTextField
          name='kpoCategory'
          label='KPO Category'
          className='my-10'
        >
          <MenuItem value="Active">
            Office Admin
          </MenuItem>
          <MenuItem value="Inactive">
            Dev Ops
          </MenuItem>
        </SelectTextField>
        <Input
          name='description'
          label='Description'
          className='my-16'
          multiline
        />
        <Input
          className='my-16'
          name='target'
          label='Target'
        />
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