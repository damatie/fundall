import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import { CircularProgress } from '@material-ui/core';
import ProgressBtn from 'app/shared/progressBtn';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { DateTimePicker } from '@material-ui/pickers';
import * as Actions from './store/actions';

export default function AddCheckListModal() {
	const dispatch = useDispatch();
	const loading = useSelector(({ checkList }) => checkList.checkList.loading);
	const success = useSelector(({ checkList }) => checkList.checkList.success);
	const [open, setOpen] = useState(false);
	const [isFormValid, setIsFormValid] = useState(true);

	// useEffect(() => {
	// 	dispatch(Actions.getEmployees());
	// }, [dispatch]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const formRef = useRef(null);

	const disableButton = () => {
		setIsFormValid(false);
	};

	const enableButton = () => {
		setIsFormValid(true);
	};

	const handleSubmit = model => {
		console.log(model);
		dispatch(Actions.createCheckList(model));
		handleClose();
	};

	return (
		<div>
			<Fab
				color="secondary"
				aria-label="add"
				className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
				onClick={handleClickOpen}
			>
				<Icon>add</Icon>
			</Fab>
			<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add Check List</DialogTitle>
				<DialogContent>
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
								name="type"
								label="Type"
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
												info
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								margin="normal"
								required
							/>
							<DialogActions>
								<Grid container spacing={1}>
									<Grid item xs>
										<ProgressBtn loading={loading} success={success} content="Create" disable={!isFormValid} />
									</Grid>
								</Grid>
							</DialogActions>
							<br></br>
						</Formsy>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
