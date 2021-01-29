import React from 'react';
import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import Divider from '@material-ui/core/Divider';
import SharedButton from 'app/shared/button/SharedButton';
import swal from 'sweetalert2';

const ChangePasswordModal = () => {
  return (
    <SharedModal
      title='Change Password'
      handleClose={() => swal.fire({text: 'Please you have to change your password before you can move-on', icon: 'info'})}
      open={false}
    >
      <form>
        <div className='my-16'>
          <Input
            name='currentPassword'
            label='Current Password'
            type='password'
          />
        </div>
        <Divider />
        <div className='my-16'>
        <Input
          name='newPassword'
          label='New Password'
          type='password'
        />
        </div>
        <div className='my-16'>
        <Input
          name='confirmPassword'
          label='Confirm Password'
          type='password'
        />
        </div>
        <SharedButton
          type='submit'
          className='flex flex-col mx-auto'
          color='secondary'
          variant='contained'
        >
          Submit
        </SharedButton>
      </form>
    </SharedModal>
  );
};

export default ChangePasswordModal;