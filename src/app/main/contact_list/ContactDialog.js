import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const defaultFormState = {
	id: '',
	firstName: '',
	lastName: '',
	profilePicture: 'assets/images/avatars/profile.jpg',
	phoneNumber: '',
	officeNumber: '',
	officeExtention: '',
	entity: '',
	department: '',
};

function ContactDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...contactDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return contactDialog.type === 'edit'
			? dispatch(Actions.closeEditContactDialog())
			: dispatch(Actions.closeNewContactDialog());
	}

	function canBeSubmitted() {
		return form.name.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (contactDialog.type === 'new') {
			dispatch(Actions.addContact(form));
		} else {
			dispatch(Actions.updateContact(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeContact(form.id));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' ? 'New Contact' : 'Contact Details'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<Avatar className="w-96 h-96" alt="contact avatar" src={form.profilePicture} />
					{contactDialog.type === 'edit' && (
						<>
						<Typography variant="h6" color="inherit" className="pt-8">
							{`${form.firstName} ${form.lastName}`}
						</Typography>
						<Typography variant="subtitle1" color="inherit" className="pt-8">
						{form.email}
						</Typography>
					</>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
						<TextField
							className="mb-24"
							label="First name"
							autoFocus
							id="firstName"
							name="firstName"
							value={form.firstName}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
							disabled
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Last name"
							autoFocus
							id="LastName"
							name="LastName"
							value={form.LastName}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
							disabled
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Email"
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							disabled
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">phone</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Phone number"
							id="phoneNumber"
							name="phoneNumber"
							value={form.phoneNumber}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							disabled
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">phone</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Official Phone number"
							id="officeNumber"
							name="officeNumber"
							value={form.officeNumber}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							disabled
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">phone</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Office extension"
							id="officeExtention"
							name="officeExtention"
							value={form.officeExtention}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							disabled
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">domain</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Entity"
							id="entity"
							name="entity"
							value={form.entity}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							disabled
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">work</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Department"
							id="department"
							name="department"
							value={form.department}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							disabled
						/>
					</div>
				</DialogContent>
			</form>
		</Dialog>
	);
}

export default ContactDialog;
