import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import useKpoList from '../hooks/useKpoList';
import Input from 'app/shared/TextInput/Input';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import SharedButton from 'app/shared/button/SharedButton';
import { DatePicker } from '@material-ui/pickers'

const CreateEmployeeKpo = () => {
  const { handleCloseModal, open } = useKpoList();
  return (
    <SharedModal
      title='Create KPO'
      open={open}
      handleClose={handleCloseModal}
    >
      <form>
        <SelectTextField
          name='jobRole'
          label='Job Role'
          className='my-10'
        >
          <MenuItem value="Active">
            Office Admin
          </MenuItem>
          <MenuItem value="Inactive">
            Dev Ops
          </MenuItem>
        </SelectTextField>
        {/* <Input
          name='kpoYear'
          label='KPO Year'
          type='date'
          className='my-16'
        /> */}
        <DatePicker
          label='KPO Year'
          inputVariant="outlined"
          onChange={date => console.log(new Date(date))}
          className="my-16 w-full"
        />
        <Input
          className='my-16'
          name='lineManager'
          label='Line Manager'
        />
        <Input
          className='my-16'
          name='reviewingManager'
          label='Reviewing Manager'
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