import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Button } from '@material-ui/core';
import SelectTextField from 'app/shared/TextInput/SelectTextField';

const useStyles = makeStyles(theme => ({
	form: {
		width: '40%',
		marginLeft: '6%'

		// [theme.breakpoints.down('sm')]: {
		// 	flexDirection: 'column',
		// 	alignItems: 'center',
		// 	height: '100%'
		// border: '1px solid #000000',
		// }
	},
	selectDiv: {
		marginTop: '10%'
	},
	generalDiv: {
		marginBottom: '15%'
	},
	editableField: {
		border: '1px  solid #E0E0E0',

		'&:focus': {
			outline: '1px solid #000000 !important',
			borderRadius: 10
		}
	},
	totalPipAchievedInput: {
		border: '1px solid #000000'
	},
	inputField: {
		borderRadius: 5,
		width: '100%',
		height: 50
	},
	inputLabel: {
		color: '#000000',
		fontWeight: 600,
		fontSize: 14
	},
	pipBonusInputLabel: {
		borderBottom: '1px solid #E0E0E0',
		marginBottom: '5%',
		paddingBottom: '6%'
	},
	pipBonusField: {
		backgroundColor: '#F3F3F3',
		borderRadius: 9
	},
	submitBtn: {
		width: '35%',
		marginTop: '10%'
	}
}));

const PIPCalculation = () => {
	const classes = useStyles();

	const [pipSelect, setPipSelect] = useState('');
	const [employeesSalary, setEmployeesSalary] = useState('');
	const [bonusAndPipAchieved, setBonusAndPipAchieved] = useState({
		pipBonus: '',
		pipAchieved: ''
	});

	const handleChange = e => {
		const { value } = e.target;

		setPipSelect(value);
	};

	const compensationType = [
		{
			id: 1,
			content: 'Basic Salary'
		},
		{
			id: 2,
			content: 'Gross anual salary'
		}
	];

	useEffect(() => {
		console.log(pipSelect, 'pipSelect');
	}, [pipSelect]);

	return (
		<form className={` ${classes.form}`}>
			<SelectTextField
				name="compensationType"
				// label="Compensation Type"
				onChange={handleChange}
				value={pipSelect !== '' ? pipSelect : 'Compensation Type'}
				className={` ${classes.generalDiv} ${classes.selectDiv}`}
				placeho
				// error={errors.jobTitleId}
				// message={errors.jobTitleId?.message}
			>
				{compensationType?.length > 0 &&
					compensationType.map(({ content, id }) => (
						<MenuItem value={content} key={id}>
							{content}
						</MenuItem>
					))}
			</SelectTextField>
			{pipSelect !== '' && (
				<div className={` ${classes.generalDiv}`}>
					<h3 className={` ${classes.inputLabel}`}>Employee {pipSelect}</h3>
					<input
						type="text"
						value={employeesSalary}
						onChange={e => setEmployeesSalary(e.target.value)}
						className={` ${classes.inputField} ${classes.editableField}`}
					/>
				</div>
			)}
			<div className={` ${classes.generalDiv}`}>
				<h3 className={` ${classes.inputLabel}`}>Total %PIP achieved</h3>
				<input
					type="text"
					value={bonusAndPipAchieved.pipAchieved}
					className={` ${classes.inputField} ${classes.totalPipAchievedInput}`}
					disabled
				/>
			</div>
			<div>
				<h3 className={` ${classes.inputLabel} ${classes.pipBonusInputLabel}`}>PIP Bonus</h3>
				<input
					type="text"
					value={bonusAndPipAchieved.pipBonus}
					className={` ${classes.pipBonusField} ${classes.inputField}`}
					disabled
				/>
			</div>
			<Button variant="contained" color="primary" className={` ${classes.submitBtn}`}>
				Submit
			</Button>
		</form>
	);
};

export default PIPCalculation;
