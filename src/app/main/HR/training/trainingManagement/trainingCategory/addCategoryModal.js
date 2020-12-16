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
import * as Actions from './../store/actions';
import reducer from './../store/reducers';
import FuseAnimate from '@fuse/core/FuseAnimate';

export default function AddCourseModal(props) {
  const loading = useSelector(({ TrainingCategory }) => TrainingCategory.categories.loading);
  const success = useSelector(({ TrainingCategory }) => TrainingCategory.categories.success);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

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
    dispatch(Actions.addCategory(model));
    setOpen(false);
  }

  return (
    <div>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Button
          className="whitespace-no-wrap normal-case"
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
        >
          <span className="hidden sm:flex">Add New Category</span>
          <span className="flex sm:hidden">New</span>
        </Button>
      </FuseAnimate>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'} aria-labelledby="form-dialog-title">
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
                className="mb-16 w-full"
                type="text"
                name="name"
                label="Name"
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
                        category
                                        </Icon>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mb-16 w-full"
                type="text"
                name="description"
                label="Description"
                validations={{
                  minLength: 5
                }}
                validationErrors={{
                  minLength: 'Min character length is 1'
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        category
                                        </Icon>
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                required
              />

              <SelectFormsy
                className="my-16"
                name="status"
                label="Status"
                value="none"
                // validations="not-equals:none"
                validationError="required"
                variant="outlined"
                required
              >
                <MenuItem default >Select</MenuItem>
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </SelectFormsy>

              <DialogActions>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <ProgressBtn success={success} loading={loading} content='Create' disable={!isFormValid} />
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