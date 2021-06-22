import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from 'app/shared/TextInput/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';


const schema = yup.object().shape({
    oldPassword: yup.string().required(errorMsg({ name: 'This Field', type: 'required' })),
	password: yup.string()
      .min(6)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
      .required(errorMsg({ name: 'Password', type: 'required' })),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(errorMsg({ name: 'Confirm Password', type: 'required' })),
  });

function ChangePassword({current}) {
	const { register, handleSubmit, formState:{ errors } } = useForm({
		mode: "onBlur",
		resolver: yupResolver(schema)
	});

	const dispatch = useDispatch();

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	const onSubmit = async (data) => {
		try {
		  const form = { ...data }
		  console.log('change Password form: ', form);
		  loading('Updating Password...');
		  const { data: { message, success  } } = await api.patch('/auth/employee/change_password', form);
		  if(success) {
			  swal.fire({
				text: message,
				icon: 'success'
			  });
			  if (current) {
				localStorage.clear();
				return (
					<Redirect to='/auth/login' />
				);
			  }
			return (
				<Redirect to='/' />
			);
		  } else {
			swal.fire({
				text: message || 'Something went wrong',
				icon: 'error'
			})	  
		  }
		} catch (e) {
		  swal.fire({
			text: e?.message || 'Something went wrong',
			icon: 'error'
		  })
		}
	};

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3} justify='space-between' align='center' style={{ marginBottom: '3rem'}}>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Input
							required
							label={current ? "Current Password" : "Temporary Password"}
							type={current ? 'password' : "text"}
							name='oldPassword'
							error={errors.oldPassword}
							message={errors.oldPassword?.message}
							helperText={errors.oldPassword?.message}
							refs={register}
						/>
					</Grid>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Input
							required
							label='Password'
							name='password'
							type='password'
							error={errors.password}
							message={errors.password?.message}
							helperText={errors.password?.message}
							refs={register}
						/>
					</Grid>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Input
							required
							label='Confirm Password'
							name='confirmPassword'
							type='password'
							error={errors.confirmPassword}
							message={errors.confirmPassword?.message}
							helperText={errors.confirmPassword?.message}
							refs={register}
						/>
					</Grid>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Button variant="contained" type='submit' color="primary" style={{ width: '100%'}}>
							UPDATE PASSWORD 
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
}

export default ChangePassword;
