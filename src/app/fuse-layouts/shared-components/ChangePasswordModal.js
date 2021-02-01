import React from 'react';
import SharedModal from 'app/shared/modal/SharedModal';
import Input from 'app/shared/TextInput/Input';
import Divider from '@material-ui/core/Divider';
import SharedButton from 'app/shared/button/SharedButton';
import swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from 'app/services/api';
import loading from 'utils/loading';
import catchErrorMsg from 'utils/catchErrorMsg';
import * as authActions from 'app/auth/store/actions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  oldPassword: yup.string().required('Please enter your current password'),
  password: yup.string().min(4, 'New password must be less than 4').required('Please enter your new password'),
  confirmPassword: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ChangePasswordModal = ({open}) => {
  const {
    errors,
    register,
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    try {
      loading('Changing password...');
      const { data: { message  } } = await api.patch('/auth/employee/change_password', value);
      swal.fire({
        text: message,
        icon: 'success'
      });
      dispatch(authActions.logoutUser());
      localStorage.clear();
      window.location.assign('/auth/login')
    } catch (e) {
      swal.fire({
        text: catchErrorMsg(e),
        icon: 'error'
      })
    }
  };


  return (
    <SharedModal
      title='Change Password'
      handleClose={() => swal.fire({text: 'Please you have to change your password before you can move-on', icon: 'info'})}
      open={open}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='my-16'>
          <Input
            name='oldPassword'
            label='Current Password'
            type='password'
            refs={register}
            message={errors.oldPassword?.message}
            error={errors.oldPassword}
          />
        </div>
        <Divider />
        <div className='my-16'>
        <Input
          name='password'
          label='New Password'
          type='password'
          refs={register}
          message={errors.password?.message}
          error={errors.password}
        />
        </div>
        <div className='my-16'>
        <Input
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          refs={register}
          message={errors.confirmPassword?.message}
          error={errors.confirmPassword}
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