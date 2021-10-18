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
	},
	card: {
		// marginTop: '1rem',
		padding: '1rem',
		borderRadius: '2rem',
		backgroundColor: '#fff',
		boxShadow: '0 .5rem 2rem rgba(0,0,0,0.1)',
		position: 'relative'
	},
}));

const schema = yup.object().shape({
	// entityId: yup
	// 	.number(errorMsg({ name: 'Entity', type: 'string' })),
	gradeName: yup
		.string(errorMsg({ name: 'Employee Grade', type: 'string' }))
		.min(2, errorMsg({ name: 'Employee Grade', type: 'min', number: 2}))
		.max(60, errorMsg({ name: 'Employee Grade', type: 'max', number: 60 }))
		.required(errorMsg({ name: 'Employee Grade', type: 'required' })),
	gradeDescription: yup
		.string(errorMsg({ name: 'Description', type: 'string' }))
		// .min(3, errorMsg({ name: 'Description', type: 'min', number: 3 }))
		.max(1000, errorMsg({ name: 'Description', type: 'max', number: 1000 })),
	minGross: yup
		.number(errorMsg({ name: 'Min Grade', type: 'number' }))
		.min(100000, errorMsg({ name: 'Min Grade', type: 'min', number: 100000 }))
		.required(errorMsg({ name: 'Min Grade', type: 'required' })),
	maxGross: yup
		.number(errorMsg({ name: 'Max Grade', type: 'number' }))
		.moreThan(yup.ref("minGross"))
		.required(errorMsg({ name: 'Max Grade', type: 'required' }))
});

export default function EmployeeGradeModal({ open, employeeGrades, type, item, entity, entities, setOpen, data, edit }) {
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
	const [entityId, setEntityId] = React.useState((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.entityId || item?.entityId : entity?.id);
	const [entityErr, setEntityErr] = React.useState('');
	const [gradeName, setGradeName] = React.useState((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.gradeName || item?.gradeName : "");
	const [gradeDescription, setGradeDescription] = React.useState((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.gradeDescription || item?.gradeDescription : "");
	const [minGross, setMinGross] = React.useState((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.minGross || item?.minGross : 0);
	const [maxGross, setMaxGross] = React.useState((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.maxGross || item?.maxGross : 0);
	const [entityName, setEntityName] = React.useState((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.entityName || item?.entityName : entity?.entityName);
	const [employeeGrade, setEmployeeGrade] = React.useState('');
	const [pipEligibility, setPipEligibility] = React.useState((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.pipEligibility || item?.pipEligibility : true);
	const [employeeGradeErr, setEmployeeGradeErr] = React.useState('');
	const classes = useStyles();


	React.useEffect(() => {
		setEntityName((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.entityName || item?.entityName : entity?.entityName);
		setEntityId((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.entityId || item?.entityId : entity?.id );
		setGradeName((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.gradeName || item?.gradeName : "");
		setGradeDescription((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.gradeDescription || item?.gradeDescription : "");
		setMinGross((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.minGross || item?.minGross : 0);
		setMaxGross((type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? data?.maxGross || item?.maxGross : 0);
	}, [type, item]);

	React.useEffect(() => {
		register({ name: 'entityId', type: 'custom' }, { required: false });
		setValue('entityId', entityId);
		register({ name: 'gradeName', type: 'custom' }, { required: true });
		setValue('gradeName', gradeName);
		register({ name: 'gradeDescription', type: 'custom' }, { required: true });
		setValue('gradeDescription', gradeDescription);
		register({ name: 'gradeDescription', type: 'custom' }, { required: true });
		setValue('gradeDescription', gradeDescription);
		register({ name: 'minGross', type: 'custom' }, { required: true });
		setValue('minGross', minGross);
		register({ name: 'maxGross', type: 'custom' }, { required: true });
		setValue('maxGross', maxGross);
		if (edit === false || !(type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE')) {
			data = {};
		}
	}, [type]);

	React.useEffect(() => {
		setEntityErr(errors.entityId?.message);
		setEmployeeGradeErr(errors.gradeName?.message);
	}, [errors]);

	const handlePipEligibilityChange = event => {
		setPipEligibility(event.target.checked);
	};

	React.useEffect(() => {
		dispatch(Actions.getGrades());
		dispatch(Actions.getEntities());
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

	const onSubmit = async (value) => {
		console.log("SUBMITIING")
		const form = { ...value, entityId, entityName, pipEligibility };
		console.log('Employee Grade form: ', form);
		if (edit || (type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE')) {
			try {
				form.id = data?.id || item?.id;
				loading('Updating Employee Grade...');
				const {
					data: { message, success }
				} = await api.patch(`employee-grade/${form?.id}`, form);
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
		<Modal title={edit || (type?.option === 'EDIT' && type?.component === 'EMPLOYEEGRADE') ? 'Edit Employee Grade' : 'Add Employee Grade'} handleClose={() => setOpen(false)} open={open}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid
					container
					spacing={3}
					justify="space-between"
					align="center"
					style={{ marginBottom: '2rem', marginTop: '2rem', overflowY: 'scroll' }}
				>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Grid container item spacing={1} lg={12} md={12} sm={12} xs={12} className={classes.card}>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<Typography variant="h6" className="font-bold">
									Entity Name
								</Typography>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<Typography variant="body2" color="initial" className="mt-6">
									{entity?.entityName}
								</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item lg={12} md={12} sm={12} xs={12}>
					{/* <FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<InputLabel id="dateFormat-label">Employee Grade</InputLabel>
							<Select
								justify="left"
								align="left"
								labelId="dateFormat-label"
								id="dateFormat"
								name="dateFormat"
								variant="outlined"
								ref={register}
								error={errors.gradeName}
								message={errors.gradeName?.message}
								value={accountSetting?.gradeName}
								onChange={ev => {
									setAcountSetting({
										...accountSetting,
										gradeName: ev.target.value
									});
								}}
								label="Date Format"
							>
								{dateFormats.map((item, index) => (
									<MenuItem key={`${item.value}-${index}`} value={item.value}>
										{item.label}
									</MenuItem>
								))}
							</Select>
							<FormHelperText style={{ color: 'red' }}>{errors?.gradeName?.message}</FormHelperText>
						</FormControl> */}
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
								name="minGross"
								type="number"
								defaultValue={minGross}
								error={errors.minGross}
								message={errors.minGross?.message}
								helperText={errors.minGross?.message}
								refs={register}
							/>
						</Grid>
						<Grid item lg={4} md={6} sm={6} xs={6}>
							<Input
								label="Max"
								name="maxGross"
								type="number"
								defaultValue={maxGross}
								error={errors.maxGross}
								message={errors.maxGross?.message}
								helperText={errors.maxGross?.message}
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
					<Button variant="contained" type='submit' color="primary" className='mx-20'>
						Save 
					</Button>
					<Button variant="contained" onClick={() => setOpen(false)} >
						Cancel 
					</Button>
				</Grid>
			</form>
		</Modal>
	);
}
