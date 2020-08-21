import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import { CircularProgress } from '@material-ui/core';
import ProgressBtn from 'app/shared/progressBtn';
import Grid from '@material-ui/core/Grid';
import * as Actions from '../store/actions';
import { ThemeProvider } from '@material-ui/core/styles';
import { useAuth } from 'app/hooks/useAuth';

export default function FileUpdateModal(props) {
	const dispatch = useDispatch();
	const categories = useSelector(({ fileManagerApp }) => fileManagerApp.categories.categories);
	const selectedItem = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId.selectedItem);
	const loading = useSelector(({ fileManagerApp }) => fileManagerApp.files.loading);
	const success = useSelector(({ fileManagerApp }) => fileManagerApp.files.success);
	const [open, setOpen] = useState(false);
	const [isFormValid, setIsFormValid] = useState(true);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const userId = useAuth().getId;

	useEffect(() => {
		dispatch(Actions.getCategories());
	}, [dispatch]);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const formRef = useRef(null);
	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(Actions.updateDocument(model, selectedItem.id, selectedItem.documentCategoryId));
		props.pageLayout.current.toggleRightSidebar();
		handleClose();
	}

	function HiddenBtn() {
		if (userId === selectedItem.employeeId) {
			return (
				<IconButton onClick={handleClickOpen}>
					<Icon>edit</Icon>
				</IconButton>
			);
		} else {
			return <></>;
		}
	}

	return (
		<div>
			<HiddenBtn />
			<ThemeProvider theme={mainTheme}>
				<Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Update Document</DialogTitle>
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
									name="docName"
									label="Document Name"
									value={selectedItem.docName}
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
													folder
												</Icon>
											</InputAdornment>
										)
									}}
									variant="outlined"
									required
								/>

								<SelectFormsy
									className="mb-16"
									name="documentCategoryId"
									label="Document Category"
									value={selectedItem.documentCategoryId}
									validationError="requried"
									variant="outlined"
									required
								>
									{categories.map(item => (
										<MenuItem value={item.id} key={item.id}>
											{item.categoryName}
										</MenuItem>
									))}
								</SelectFormsy>
								<DialogActions>
									<Grid container spacing={2}>
										<Grid item xs>
											<ProgressBtn loading={loading} success={success} content="Update" disable={!isFormValid} />
										</Grid>
									</Grid>
								</DialogActions>
								<br></br>
							</Formsy>
						</div>
					</DialogContent>
				</Dialog>
			</ThemeProvider>
		</div>
	);
}
