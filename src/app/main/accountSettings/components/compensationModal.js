import React from 'react';
import swal from 'sweetalert2';
import errorMsg from 'utils/errorMsg';
import api from 'app/services/api';
import loading from 'utils/loading';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from 'app/shared/TextInput/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import * as Actions from 'app/main/employeeManagement/store/actions';
import { FormHelperText } from '@material-ui/core';
import Modal from './modal';

export default function CompensationModal({ open, setOpen, selectedEntity, data }) {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// 	setValue,
	// 	getValues
	// } = useForm({
	// 	mode: 'onBlur',
	// 	reValidateMode: 'onChange',
	// 	resolver: yupResolver(schema)
	// });

	// console.log(selectedEntity);

	const dispatch = useDispatch();
	// const entityAdd = data?.address !== '' ? JSON.parse(data?.address) : [];
	const [extraMonth, setExtraMonth] = React.useState(false);
	const [hasError, setHasError] = React.useState(false);
	const [extraMonthPercentage, setExtraMonthPercentage] = React.useState(0);
	const [totalPercentage, setTotalPercentage] = React.useState(0);
	const [compensations, setCompensations] = React.useState({
		0: {
			name: '',
			percentage: 0
		}
	});

	React.useEffect(() => {
		let sum = 0;
		for (const item of Object.values(compensations)) {
			sum += Number(item.percentage);
		}
		setTotalPercentage(sum + extraMonthPercentage);
	}, [compensations, extraMonthPercentage]);

	const handleExtraMonthChange = () => {
		setExtraMonth(event.target.checked);
		if (event.target.checked) {
			setExtraMonthPercentage(100 - totalPercentage);
		} else {
            setExtraMonthPercentage(0);
        }
	};

	const handleInputChange = (event, index) => {
		const compensation = compensations[index];
		if (event.target.name === 'percentage' && event.target.value < 0) {
			return;
		}

		compensation[event.target.name] = event.target.value;
		setCompensations({
			...compensations,
			[index]: compensation
		});
	};

	const addCompensationElement = () => {
		const newIndex = Object.values(compensations).length;
		setCompensations({
			...compensations,
			[newIndex]: {
				name: '',
				percentage: 0
			}
		});
	};

	const onSubmit = async() => {
		let payload = {
			entityId: selectedEntity?.id,
			columns: Object.values(compensations)?.map(({name, percentage}) => {
			return {
				name,
				value: percentage
			};
		})}
		if(extraMonth){
			payload.columns.push({
				name: '13th Month',
				value: `${extraMonthPercentage}`
			})
		}
		console.log(payload);
		try {
			loading('Adding Compensations...');
			const { data: { message, success  } } = await api.post('/compensation', payload);
			if (success) {
				swal.fire({
					text: message,
					icon: 'success'
				});
				setOpen(false);
			} else {
				swal.fire({
					text: message ?? 'Something went wrong...',
					icon: 'error'
				})
			}
		} catch (e) {
			swal.fire({
				text: e?.message ?? 'Something went wrong...',
				icon: 'error'
			})
		}
	}

	return (
		<Modal title="Add Compensation" handleClose={() => setOpen(false)} open={open}>
			<Box display="flex" justifyContent="center" mb={3}>
				<Box maxWidth={500}>
					<Alert severity="warning">Compensation percentage must be 100% before you can save</Alert>
				</Box>
			</Box>

			<form onSubmit={() => alert('')} style={{ display: 'grid', gap: 10 }}>
				<Typography variant="h5">
					<strong>{selectedEntity?.entityName}</strong>
				</Typography>

				<FormControlLabel
					control={
						<Checkbox checked={extraMonth} disabled={(totalPercentage === 100 && !extraMonth)} onChange={handleExtraMonthChange} name="extraMonth" color="primary" />
					}
					label="13th Month included in my compensation plan"
					disabled={(totalPercentage === 100 && !extraMonth)}
				/>

				{Object.values(compensations).map(({ name, percentage }, index) => (
					<Grid container spacing={3} align="center" key={index}>
						<Grid item lg={6} md={6} sm={6} xs={6}>
							<Input
								required
								label="Compensation Name"
								name="name"
								value={name}
								onChange={event => {
									handleInputChange(event, index);
									setHasError((name && Object.values(compensations).filter((i, ind) => ind !== index).map((item) => item.name).includes(name)));
								}}
								error={(name && Object.values(compensations).filter((i, ind) => ind !== index).map((item) => item.name).includes(name))}
								message={(name && Object.values(compensations).filter((i, ind) => ind !== index).map((item) => item.name).includes(name)) ? "Compensation Name must be unique" : ""}
								helperText={(name && Object.values(compensations).filter((i, ind) => ind !== index).map((item) => item.name).includes(name)) ? "Compensation Name must be unique" : ""}
								// refs={register}
							/>
						</Grid>
						<Grid item lg={3} md={6} sm={6} xs={6}>
							<Input
								required
								label="Percentage"
								name="percentage"
								type="number"
								value={percentage}
								error={percentage <= 0 || totalPercentage > 100}
								message={(percentage <= 0) ? "Percentage must be greater than zero" : (totalPercentage > 100) ? "Total Percantage must not be greater than 100" : ""}
								helperText={(percentage <= 0) ? "Percentage must be greater than zero" : (totalPercentage > 100) ? "Total Percantage must not be greater than 100" : ""}
								onChange={event => {
									handleInputChange(event, index);
									setHasError((percentage <= 0 || totalPercentage > 100));
								}}
							/>
						</Grid>
					</Grid>
				))}

				{extraMonth && (
					<Grid container spacing={3} align="center">
						<Grid item lg={6} md={6} sm={6} xs={6}>
							<Input
								required
								label="Compensation Name"
								disabled
								value="13th Month"
								// onChange={event => handleInputChange(event, index)}
								// error={errors.email}
								// message={errors.email?.message}
								// helperText={errors.email?.message}
								// refs={register}
							/>
						</Grid>
						<Grid item lg={3} md={6} sm={6} xs={6}>
							<Input
								required
								label="Percentage"
								name="percentage"
								type="number"
								value={extraMonthPercentage}
								onChange={event => setExtraMonthPercentage(event.target.value)}
							/>
						</Grid>
					</Grid>
				)}

				<Box my={3}>
					<Button onClick={addCompensationElement} disabled={totalPercentage === 100 || hasError} variant="contained" color="secondary">
						<span style={{ marginRight: '5px' }}>
							<AddBoxOutlinedIcon />
						</span>{' '}
						Add Compensation Element
					</Button>
				</Box>

				<Box width="100%" display="flex" justifyContent="center">
					<Button
						onClick={() => onSubmit()}
						disabled={totalPercentage !== 100 || hasError}
						variant="contained"
						color="secondary"
					>
						Save
					</Button>
				</Box>
			</form>
		</Modal>
	);
}
