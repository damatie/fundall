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
	departmentName: yup
		.string(errorMsg({ name: 'Department Name', type: 'string' }))
		.min(3, errorMsg({ name: 'Department Name', type: 'min', number: 3 }))
		.max(60, errorMsg({ name: 'Department Name', type: 'max', number: 60 }))
		.required(errorMsg({ name: 'Department Name', type: 'required' })),
	description: yup
		.string(errorMsg({ name: 'Description', type: 'string' }))
		.min(3, errorMsg({ name: 'Description', type: 'min', number: 3 }))
		.max(1000, errorMsg({ name: 'Description', type: 'max', number: 1000 })),
	departmentCode: yup
		.string(errorMsg({ name: 'Department Code', type: 'string' }))
		.min(3, errorMsg({ name: 'Department Code', type: 'min', number: 3 }))
		.required(errorMsg({ name: 'Department Code', type: 'required' })),
	startedOn: yup.string().required(errorMsg({ name: 'Start Date', type: 'required' })),
	address: yup
		.array()
		.min(1, 'Must have at least one Address')
		.required(errorMsg({ name: 'Address', type: 'required' }))
});

export default function DepartmentModal({ open, entities, setOpen, data, edit }) {
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
	const [startedOn, setStartedOn] = React.useState((data.startedOn && new Date(data?.startedOn)) || new Date());
	const [newAdded, setNewAdded] = React.useState([]);
	const [updated, setUpdated] = React.useState([]);
	const [entityId, setEntityId] = React.useState(data?.entityId || 0);
	const [entityErr, setEntityErr] = React.useState('');
	const [department, setDepartment] = React.useState(data?.departmentName || '');
	const [departmentCode, setDepartmentCode] = React.useState(data?.departmentCode || '');
	const [description, setDescription] = React.useState(data?.description || '');
	const [address, setAddress] = React.useState(data?.address || []);
	const [addressErr, setAddressErr] = React.useState('');
	const classes = useStyles();

	React.useEffect(() => {
		register({ name: 'entityId', type: 'custom' }, { required: true });
		setValue('entityId', entityId);
		register({ name: 'departmentName', type: 'custom' }, { required: true });
		setValue('departmentName', department);
		register({ name: 'departmentCode', type: 'custom' }, { required: true });
		setValue('departmentCode', departmentCode);
		register({ name: 'startedOn', type: 'custom' }, { required: true });
		setValue('startedOn', JSON.stringify(startedOn));
		register({ name: 'description', type: 'custom' }, { required: true });
		setValue('description', description);
		register({ name: 'address', type: 'custom' }, { required: true });
		setValue('address', address);
		if (edit === false) {
			data = {};
		}
	}, []);

	React.useEffect(() => {
		register({ name: 'startedOn', type: 'custom' }, { required: true });
		setValue('startedOn', JSON.stringify(startedOn));
	}, [startedOn]);

	React.useEffect(() => {
		setEntityErr(errors.entityId?.message);
		setAddressErr(errors.address?.message);
	}, [errors]);

	React.useEffect(() => {
		dispatch(Actions.getDepartments());
		console.log('newAdded: ', newAdded);
		console.log('updated: ', updated);
	}, [newAdded, updated]);

	const handleEntityChange = async event => {
		setEntityId(event.target.value);
		register({ name: 'entityId', type: 'custom' }, { required: true });
		setValue('entityId', event.target.value);
		setEntityErr(errors.entityId?.message);
	};

	const handleAddAddress = chip => {
		register({ name: 'address', type: 'custom' }, { required: true });
		address.push(chip);
		setValue('address', address);
		setAddressErr(errors.address?.message);
	};

	const handleDeleteAddress = (chip, index) => {
		register({ name: 'address', type: 'custom' }, { required: true });
		setAddress(address => address.filter(chp => chp !== chip));
		setValue('address', address);
		setAddressErr(errors.address?.message);
	};

	const handleDepartmentChange = async event => {
		setDepartment(event.target.value);
		register({ name: 'departmentName', type: 'custom' }, { required: true });
		setValue('departmentName', event.target.value);
	};

	const onSubmit = async value => {
		const departmentHeadId = 0;
		const form = { ...value, departmentHeadId };
		form.startedOn = form.startedOn.substring(1, 11);
		if (edit) {
			try {
				form.id = data?.id;
				loading('Updating Department...');
				const {
					data: { message, success }
				} = await api.patch(`department/${data?.id}`, form);
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
				loading('Adding Department...');
				const {
					data: { message, success }
				} = await api.post('/department', form);
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
		<Modal title={edit ? 'Edit Department' : 'Add Department'} handleClose={() => setOpen(false)} open={open}>
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
							name="departmentName"
							type="text"
							defaultValue={department}
							error={errors.departmentName}
							message={errors.departmentName?.message}
							onChange={handleDepartmentChange}
							label="Department Name"
							refs={register}
						/>
					</Grid>
					{/* <Grid item lg={12} md={12} sm={12} xs={12}>
						<Input
							name="departmentCode"
							type="text"
							defaultValue={departmentCode}
							error={errors.departmentCode}
							message={errors.departmentCode?.message}
							label="Department Code"
							refs={register}
						/>
					</Grid> */}
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<Input
							label="Description"
							name="description"
							type="text"
							multiline
							rows="4"
							defaultValue={description}
							error={errors.description}
							message={errors.description?.message}
							helperText={errors.description?.message}
							refs={register}
						/>
					</Grid>
					{/* <Grid item lg={12} md={12} sm={12} xs={12}>
						<FormControl
							variant="outlined"
							style={{ width: '100%', margin: '8px 0px' }}
							className={classes.formControl}
						>
							<DatePicker
								inputVariant="outlined"
								name="startedOn"
								maxDate={new Date()}
								defaultValue={startedOn}
								error={errors.startedOn}
								message={errors.startedOn?.message}
								label="Start Date"
								className="w-full"
								onChange={newValue => {
									setStartedOn(newValue);
									register({ name: 'startedOn', type: 'custom' }, { required: true });
									setValue('startedOn', JSON.stringify(newValue));
								}}
								format="MM/DD/yyyy"
								helperText={errors.startedOn?.message}
							/>
						</FormControl>
					</Grid> */}
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<ChipInput
							label="Addresses (Separate with Enter)"
							name="address"
							variant="outlined"
							placeholder="Enter Addresses Here"
							// newChipKeyCodes={[188]}
							style={{ width: '100%' }}
							error={errors.address}
							message={errors.address?.message}
							allowDuplicates={false}
							value={address}
							onAdd={chip => handleAddAddress(chip)}
							onDelete={(chip, index) => handleDeleteAddress(chip, index)}
						/>
						<FormHelperText style={{ color: 'red' }}>{addressErr}</FormHelperText>
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
