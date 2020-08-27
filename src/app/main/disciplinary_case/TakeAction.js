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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CircularProgress } from '@material-ui/core';
import ProgressBtn from 'app/shared/progressBtn';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { DateTimePicker } from '@material-ui/pickers';
import * as Actions from './store/actions';


const CaptializeFirstLetter = word => {
	if (word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	return '';
};
export default function TakeAction(props) {
	const dispatch = useDispatch();
	const selected = props.selectedItem;
	const loading = useSelector(({ disciplinaryCase }) => disciplinaryCase.disciplinaryCase.loading);
	const success = useSelector(({ disciplinaryCase }) => disciplinaryCase.disciplinaryCase.success);
	const [value, setValue] = React.useState('female');
	const [isFormValid, setIsFormValid] = useState(true);
	const [form, setForm] = useState({
		actionType: '',
		description: '',
		status: '',
        recommendation: '',
        disciplinaryCaseId: 0
	});
	useEffect(() => {
	}, [dispatch]);


	useEffect(() => {
		setForm({
			actionType: '',
            description: '',
            status: 'open',
            recommendation: '',
            disciplinaryCaseId: selected.id
		});
	}, [selected])

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const formRef = useRef(null);

	const disableButton = () => {
		setIsFormValid(false);
	};

	const enableButton = () => {
		setIsFormValid(true);
    };
    

	const handleSubmit = () => {
		console.log(form);
		dispatch(Actions.createDisciplinaryAction(form));
		props.handleClose();
	};

	return (
		<div>
			{/* Modal to handle list of Action from the Database */}
			<Dialog open={props.open} onClose={props.handleClose} fullWidth={true} maxWidth={'xs'} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Disciplinary Actions</DialogTitle>
				<DialogContent>
					<div className="w-full">
					<form noValidate>
						{/* <Grid container spacing={4}> */}
						<TextField
                            className="mb-16 w-full"
                            type="text"
                            name="actionType"
                            // value={selected.caseDescription}
                            onChange={ev => {form.actionType = ev.target.value; setForm(form)}}
                            label="Action Type"
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
                        <TextField
                            className="mb-16 w-full"
                            type="text"
                            name="description"
                            // value={selected.caseDescription}
                            onChange={ev => {form.description = ev.target.value; setForm(form)}}
                            label="Description"
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
                        <TextField
                            className="mb-16 w-full"
                            type="text"
                            name="recommendation"
                            // value={selected.caseDescription}
                            onChange={ev => {form.recommendation = ev.target.value; setForm(form)}}
                            label="Recommendation"
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
						{/* </Grid> */}
						
						<DialogActions>
							<Grid container spacing={4} style={{textAlign: 'center'}}>
								<Grid item xs={6}>
									<Button variant="contained" className="w-full" color="secondary" type="button" onClick={props.handleClose}>Cancel</Button>
								</Grid>
								<Grid item xs={6}>
									<Button variant="contained" className="w-full" color="primary" type="button" onClick={handleSubmit}>Apply</Button>
								</Grid>
							</Grid>
						</DialogActions>
						<br></br>
					</form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
