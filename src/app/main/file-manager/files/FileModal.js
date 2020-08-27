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
import * as Actions from '../store/actions';
import SharedDropzone from 'app/shared/sharedDropZone';

export default function FileModal() {
    const dispatch = useDispatch();
    const categories = useSelector(({ filesByCategories }) => filesByCategories.categories.categories);
    const loading = useSelector(({ filesByCategories }) => filesByCategories.files.loading);
    const success = useSelector(({ filesByCategories }) => filesByCategories.files.success);
    const role = useSelector(({ profile }) => profile.data.role.name);
    const [open, setOpen] = React.useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [file, setFile] = useState('');

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
    console.log(model);
    console.log(file[0]);
    dispatch(Actions.createDocument(model, file[0]));
    handleClose();
  }

  function fileChange(event){
    setFile({"file": event.target.files[0]});
  }

  useEffect(() => {
    dispatch(Actions.getCategories());
  },[dispatch] )

  return (
    <div>
        {role.toLowerCase() === 'hr' ?  
        <Fab
            color="secondary"
            aria-label="add"
            className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
            onClick={handleClickOpen}
        >
            <Icon>add</Icon>
        </Fab> : <></>}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'} aria-labelledby="form-dialog-title">
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
                    required
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
                    name="documentCategoryId"
                    label="Document Category"
                    value="none"
                    validationError="requried"
                    variant="outlined"
                    required
                  >
                    <MenuItem value="none"></MenuItem>
                    {categories.map(item => (
                      <MenuItem value={item.id} key={item.id}>{item.categoryName}</MenuItem>
                    ))}
                  </SelectFormsy>
                  {/* <TextField
                    className="mb-16"
                    type="file"
                    name="docFile"
                    label="Document File"
                    required
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
                  /> */}
                  <SharedDropzone name={"Document File"} allowedTypes={'image/*, application/*'} setValue={setFile}/>
                  <DialogActions>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <ProgressBtn  success={success} loading={loading} content='Upload' disable={!isFormValid}/>
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