import { TextFieldFormsy, CheckboxFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Typography } from '@material-ui/core';

function UpdateRolesPermissionTab(props) {
	const dispatch = useDispatch();
	// const leaveOption = useSelector(({ leaveOption }) => leaveOption.leaveOption);

	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	useEffect(() => {
		// if (register.error && (register.error.username || register.error.password || register.error.email)) {
		// 	formRef.current.updateInputsWithError({
		// 		...register.error
		// 	});
		// 	disableButton();
		// }
	}, []);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		// dispatch(Actions.saveLeaveOptions(model));
	}

	// if(leaveOption.success) {
	// 	return (
	// 		<Redirect to='/hr/leave_options' />
	// 	);
	// }

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="roleName"
					label="Role name"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
                  folder_shared
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
        <Permission />
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid}
					value="legacy"
				>
					Update
				</Button>
			</Formsy>
		</div>
	);
};

const permission = {
  name:"Admin",
  permissions: [
    { 
      resourceId:7,
      name: 'Leave type',
      canAdd:false,
      canView:true,
      canEdit:false,
      canDelete:false
    },
    { 
      name: 'Leave Options',
      resourceId:7,
      canAdd:false,
      canView:true,
      canEdit:false,
      canDelete:false
    },
    { 
      name: 'Employee',
      resourceId:7,
      canAdd:false,
      canView:true,
      canEdit:false,
      canDelete:false
    }
  ]
}
const Permission = () => {
  return (
    <>
    {permission.permissions.map(item => (
      <div key={item.resourceId}>
        <Typography component='h3'>
          {item.name}
        </Typography>
        <CheckboxFormsy
          className="my-16"
          name="accept"
          value={item.canAdd}
          label="Can Add"
        />
        <CheckboxFormsy
          className="my-16"
          name="accept"
          value={item.canDelete}
          label="Can Delete"
        />
        <CheckboxFormsy
          className="my-16"
          name="accept"
          value={item.canEdit}
          label="Can Edit"
        />
        <CheckboxFormsy
          className="my-16"
          name="accept"
          value={item.canView}
          label="Can View"
        />
    </div>
    ))}
    </>
  )
}

export default UpdateRolesPermissionTab;
