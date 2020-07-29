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
import * as Actions from './store/actions/files.actions';

export default function FileModal() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [file, setFile] = useState({});

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
        dispatch(Actions.createDocument(model, file));
        setOpen(false);
    }

    function fileChange(event){
        console.log(event.target.files[0]);
        setFile({"file": event.target.files[0]});
    }

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
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Document</DialogTitle>
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
          className="my-16"
          name="docType"
          label="Document Type"
          value=""
          validationError="requried"
          variant="outlined"
					required
        >
					{['Personal-Data', 'Engineering', 'contract'].map(item => (
						<MenuItem value={item} key={item}>{item}</MenuItem>
					))}
        </SelectFormsy>
        <TextField
					className="mb-16"
					type="file"
					name="docFile"
					label="Document File"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
                                    files
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
                    required
                    onChange={fileChange}
				/>
        <DialogActions>
				<Grid container spacing={2}>
                    <Grid item xs>
                        <ProgressBtn  content='Create' disable={!isFormValid}/>
                    </Grid>

                    <Grid item xs>
                        <ProgressBtn  content='Close' onClick={handleClose}/>
                    </Grid>
                </Grid>
            </DialogActions>
                <br></br>
			</Formsy>
		</div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}