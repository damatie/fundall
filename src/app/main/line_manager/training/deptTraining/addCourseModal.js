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
import * as Actions from './store/actions';
import FuseAnimate from '@fuse/core/FuseAnimate';

export default function AddCourseModal(props) {
    const dispatch = useDispatch();
	const courseCategories = useSelector(({ DeptTraining }) => DeptTraining.courses.courseCategories);
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

	// function handleSubmit(model) {
    //     dispatch(Actions.createDocument(model, file));
    //     setOpen(false);
    // }

    useEffect(() => {
		dispatch(Actions.getCourseCategories());
	}, [dispatch]);
  return (
    <div>
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
            >
                <span className="hidden sm:flex">Add New Course</span>
                <span className="flex sm:hidden">New</span>
            </Button>
        </FuseAnimate>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Course</DialogTitle>
        <DialogContent>
          <div className="w-full">
			<Formsy
				// onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid container item md={6} lg={6} lx={6} alignItems="center">
                        <TextFieldFormsy
                            className="mb-16 w-full"
                            type="text"
                            name="name"
                            label="Course Name"
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
                    </Grid>
                    <Grid container item sm={6} md={6} lg={6} lx={6} alignItems="center">
                        <TextFieldFormsy
                            className="mb-16 w-full"
                            type="number"
                            name="cost"
                            label="Cost"
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
                                            money
                                        </Icon>
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid container item sm={6} md={6} lg={6} lx={6} alignItems="center">
                        <TextFieldFormsy
                            className="mb-16 w-full"
                            type="text"
                            name="duration"
                            label="Duration"
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
                                            timeline
                                        </Icon>
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid container item sm={6} md={6} lg={6} lx={6} alignItems="center">
                        <TextFieldFormsy
                            className="mb-16 w-full"
                            type="text"
                            name="location"
                            label="Location"
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
                                            location_on
                                        </Icon>
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            required
                        />
                    </Grid>
                </Grid>
                <SelectFormsy
                    className="mb-16 w-full"
                    name="category"
                    label="Course Category"
                    value=""
                    validationError="requried"
                    variant="outlined"
                    required
                >
                        {courseCategories.sort().map(item => (
                            <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                        ))}
                </SelectFormsy>
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
      </Dialog>
    </div>
  );
}