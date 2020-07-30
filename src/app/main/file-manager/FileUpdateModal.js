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
import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import { CircularProgress } from '@material-ui/core';
import ProgressBtn from 'app/shared/progressBtn';
import Grid from '@material-ui/core/Grid';
import * as Actions from './store/actions/files.actions';
import { ThemeProvider } from '@material-ui/core/styles';
import { useAuth } from 'app/hooks/useAuth';

export default function FileUpdateModal() {
    const dispatch = useDispatch();
    const files = useSelector(({ fileManagerApp }) => fileManagerApp.files);
    const selectedItem = useSelector(({ fileManagerApp }) => files[fileManagerApp.selectedItemId]);
    const [open, setOpen] = useState(false);
    const [hideBtn, setHideBtn] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [file, setFile] = useState({});
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const user = useAuth();
    const userId = useAuth().getId;

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
        dispatch(Actions.updateDocument(model, selectedItem.id));
        setOpen(false);
    }

    function fileChange(event){
        console.log(event.target.files[0]);
        setFile({"file": event.target.files[0]});
    }

    function hiddenBtn(){
      console.log(userId);
      if(userId !== selectedItem.uploaderId){
        return (
          <Hidden>
              <IconButton>
                  <Icon onClick={handleClickOpen}>edit</Icon>
              </IconButton>
          </Hidden>
        )
      }else{
        return (
          <IconButton>
						<Icon onClick={handleClickOpen}>edit</Icon>
				</IconButton>
        )
      }
    }

  return (
    <div>
        <hiddenBtn />
			<ThemeProvider theme={mainTheme}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          name="docType"
          label="Document Type"
          value={selectedItem.category}
          validationError="requried"
          variant="outlined"
					required
        >
					{['Personal-Data', 'Engineering', 'contract'].map(item => (
						<MenuItem value={item} key={item}>{item}</MenuItem>
					))}
        </SelectFormsy>
        <DialogActions>
				<Grid container spacing={2}>
                    <Grid item xs>
                        <ProgressBtn  content='Update' disable={!isFormValid}/>
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
      </ThemeProvider>
    </div>
  );
}