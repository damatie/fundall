import React from 'react';
import SharedModal from 'app/shared/modal/SharedModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from '@material-ui/pickers';
import Input from 'app/shared/TextInput/Input';
import PhoneNumberInput from 'app/shared/TextInput/PhoneNumberInput';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Card from '@material-ui/core/Card';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import { makeStyles } from '@material-ui/core/styles';
import catchErrorMsg from 'utils/catchErrorMsg';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from 'material-ui-chip-input';
import timeZone from 'app/shared/timezoneList';
import currencyList from 'app/shared/currencies';
import dateFormatList from 'app/shared/dateformat';
import { FormHelperText } from '@material-ui/core';
import Modal from './modal';
import * as Actions from 'app/main/employeeManagement/store/actions';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100%',
		overflowY: 'scroll',
		flexDirection: 'column',
		margin: '0rem auto',
		padding: '5rem',
		'& form': {
			width: '100%'
		}
	}
}));

const schema = yup.object().shape({
	entityId: yup
		.number(errorMsg({ name: 'Entity', type: 'string' }))
		.required(errorMsg({ name: 'Entity', type: 'required' })),
	gradeName: yup
		.string(errorMsg({ name: 'Employee Grade', type: 'string' }))
		.min(2, errorMsg({ name: 'Employee Grade', type: 'min', number: 3 }))
		.max(60, errorMsg({ name: 'Employee Grade', type: 'max', number: 60 }))
		.required(errorMsg({ name: 'Employee Grade', type: 'required' })),
	gradeDescription: yup
		.string(errorMsg({ name: 'Description', type: 'string' }))
		// .min(3, errorMsg({ name: 'Description', type: 'min', number: 3 }))
		.max(1000, errorMsg({ name: 'Description', type: 'max', number: 1000 })),
	gradeMin: yup
		.number(errorMsg({ name: 'Min Grade', type: 'string' }))
		.required(errorMsg({ name: 'Min Grade', type: 'required' })),
	gradeMax: yup
		.number(errorMsg({ name: 'Max Grade', type: 'string' }))
		.required(errorMsg({ name: 'Max Grade', type: 'required' }))
});

export default function EmployeeGradeModal({ open, employeeGrades, entities, setOpen, data, edit }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		resolver: yupResolver(schema)
	});

	const dispatch = useDispatch();
	const [newAdded, setNewAdded] = React.useState([]);
	const [updated, setUpdated] = React.useState([]);
	const [entityId, setEntityId] = React.useState(data?.entityId || 0);
	const [entityErr, setEntityErr] = React.useState('');
	const [gradeName, setGradeName] = React.useState(data?.gradeName || '');
	const [gradeDescription, setGradeDescription] = React.useState(data?.gradeDescription || '');
	const [gradeMin, setGradeMin] = React.useState(data?.gradeMin || 0);
	const [gradeMax, setGradeMax] = React.useState(data?.gradeMax || 0);
	const [entityName, setEntityName] = React.useState('');
	const [employeeGrade, setEmployeeGrade] = React.useState('');
	const [pipEligibility, setPipEligibility] = React.useState(data?.pipEligibility || true);
	const [employeeGradeErr, setEmployeeGradeErr] = React.useState('');
	const classes = useStyles();

	React.useEffect(() => {
		register({ name: 'entityId', type: 'custom' }, { required: true });
		setValue('entityId', entityId);
		register({ name: 'gradeName', type: 'custom' }, { required: true });
		setValue('gradeName', gradeName);
		register({ name: 'gradeDescription', type: 'custom' }, { required: true });
		setValue('gradeDescription', gradeDescription);
		register({ name: 'pipEligibility', type: 'custom' }, { required: true });
		setValue('pipEligibility', pipEligibility);
		if (edit === false) {
			data = {};
		}
	}, []);

	React.useEffect(() => {
		setEntityErr(errors.entityId?.message);
		setEmployeeGradeErr(errors.gradeName?.message);
	}, [errors]);

	const handlePipEligibilityChange = event => {
		setPipEligibility(event.target.checked);
	};

	React.useEffect(() => {
		dispatch(Actions.getGrades());
	}, [newAdded, updated]);

	const handleEntityChange = async event => {
		setEntityId(event.target.value);
		register({ name: 'entityId', type: 'custom' }, { required: true });
		setValue('entityId', event.target.value);
		entities.forEach(el => {
			if (el.id === event.target.value) {
				setEntityName(el.entityName);
			}
		});
		setEntityErr(errors.entityId?.message);
	};

	const handleEmployeeGradeChange = async event => {
		setEmployeeGrade(event.target.value);
		register({ name: 'gradeName', type: 'custom' }, { required: true });
		setValue('gradeName', event.target.value);
		setEntityErr(errors.gradeName?.message);
	};

	const onSubmit = async value => {
		const form = { ...value, entityName, pipEligibility };
		// console.log('Employee Grade form: ', form);
		if (edit) {
			try {
				form.id = data?.id;
				loading('Updating Employee Grade...');
				const {
					data: { message, success }
				} = await api.patch(`employee-grade/${data?.id}`, form);
				if (success) {
					swal.fire({
						text: message,
						icon: 'success'
					});
					setOpen(false);
					updated.push('changed');
					setUpdated(updated);
					data = {};
				} else {
					swal.fire({
						text: message ?? 'Something went wrong...',
						icon: 'error'
					});
				}
			} catch (e) {
				swal.fire({
					text: e?.message ?? 'Something went wrong...',
					icon: 'error'
				});
			}
		} else {
			try {
				loading('Adding Employee Grade...');
				const {
					data: { message, success }
				} = await api.post('/employee-grade', form);
				if (success) {
					swal.fire({
						text: message,
						icon: 'success'
					});
					setOpen(false);
					newAdded.push('changed');
					setNewAdded(newAdded);
					data = {};
				} else {
					swal.fire({
						text: message ?? 'Something went wrong...',
						icon: 'error'
					});
				}
			} catch (e) {
				swal.fire({
					text: e?.message ?? 'Something went wrong...',
					icon: 'error'
				});
			}
		}
	};

	return (
		<Modal title={edit ? 'Edit Employee Grade' : 'Add Employee Grade'} handleClose={() => setOpen(false)} open={open}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid
					container
					spacing={3}
					justify="space-between"
					align="center"
					style={{ marginBottom: '2rem', marginTop: '2rem', overflowY: 'scroll' }}
				>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Input
							label="Employee Grade"
							name="gradeName"
							type="text"
							defaultValue={gradeName}
							error={errors.gradeName}
							message={errors.gradeName?.message}
							helperText={errors.gradeDescription?.message}
							refs={register}
						/>
					</Grid>
					<Grid container item spacing={3} lg={12} md={12} sm={12} xs={12}>
						<Grid item lg={12} md={12} sm={12} xs={12} style={{ textAlign: 'left' }}>
							<Typography>Range of Gross Annual</Typography>
						</Grid>
						<Grid item lg={4} md={6} sm={6} xs={6}>
							<Input
								label="Min"
								name="gradeMin"
								type="number"
								defaultValue={gradeMin}
								error={errors.gradeMin}
								message={errors.gradeMin?.message}
								helperText={errors.gradeMin?.message}
								refs={register}
							/>
						</Grid>
						<Grid item lg={4} md={6} sm={6} xs={6}>
							<Input
								label="Max"
								name="gradeMax"
								type="number"
								defaultValue={gradeMax}
								error={errors.gradeMax}
								message={errors.gradeMax?.message}
								helperText={errors.gradeMax?.message}
								refs={register}
							/>
						</Grid>
					</Grid>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Input
							label="Description"
							name="gradeDescription"
							type="text"
							multiline
							rows="4"
							defaultValue={gradeDescription}
							error={errors.gradeDescription}
							message={errors.gradeDescription?.message}
							helperText={errors.gradeDescription?.message}
							refs={register}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3} justify="center" align="center" className="my-10">
					<Button variant="contained" type="submit" color="primary" className="mx-20">
						Save
					</Button>
					<Button variant="contained" onClick={() => setOpen(false)}>
						Cancel
					</Button>
				</Grid>
			</form>
		</Modal>
	);
}
