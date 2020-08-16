import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import { CircularProgress } from '@material-ui/core';
import ProgressBtn from 'app/shared/progressBtn';
import Grid from '@material-ui/core/Grid';
import * as Actions from '../store/actions/categories.actions';
import Tooltip from '@material-ui/core/Tooltip';

export default function AddCategoryModal() {
    const dispatch = useDispatch();
    // const loading = useSelector(({ documentCategories }) => documentCategories.categories.loading);
    // const success = useSelector(({ documentCategories }) => documentCategories.categories.success);
    const [open, setOpen] = React.useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [name, setName] = useState('')

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
    dispatch(Actions.createCategory(model));
    handleClose()
  }

  return (
    <div>
        <Tooltip title="Add Category">
          <Fab
              color="secondary"
              aria-label="add"
              className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
              onClick={handleClickOpen}
          >
              <Icon>add</Icon>
          </Fab>
        </Tooltip>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
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
					name="name"
          label="Category Name"
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
        <DialogActions>
				<Grid container spacing={1}>
            <Grid item xs>
                <ProgressBtn  content='Create' disable={!isFormValid}/>
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